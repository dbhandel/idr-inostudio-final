/* global SERVER */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  transaction,
  toJS,
  asMap,
  isObservableMap,
  extendObservable,
} from 'mobx';
import stores from 'stores';

// Use mobX's `toJS` helper to generate a JS version of
// the underlying store
function* storeToJS(store) {
  for (const storeClass of stores) {
    yield (typeof store.get(storeClass).dehydrate === 'function')
      ? toJS(store.get(storeClass).dehydrate())
      : {};
  }
}

// This will create a fresh store scoped to the request
export function createStore(defaultState = []) {
  // Use a WeakMap instead of a regular Map, so that it can
  // GC any dangling references effectively
  const storeMap = new WeakMap();

  stores.forEach(Store => storeMap.set(Store, new Store({
    stores: storeMap,
  })));

  // If we have a default state (from the server), let's breathe
  // some life back into it by copying over the properties back
  // to our new store
  transaction(() => {
    defaultState.forEach((state, i) => {
      Object.keys(state).forEach(prop => {
        storeMap.get(stores[i])[prop] = isObservableMap(storeMap.get(stores[i])[prop])
          ? asMap(state[prop]) : state[prop];
      });
    });
  });

  // Set listeners ONLY on the client
  if (!SERVER) {
    stores.forEach(Store => {
      const instance = storeMap.get(Store);
      if (typeof instance.listen === 'function') {
        instance.listen();
      }
    });
  }

  // React components that are decorated with @connect will
  // have access to this function via `this.context.store` --
  // and can pass in 'plain' store classes to access state
  function getStore(StoreClass) {
    // If the class already exists as a 'key', operate on the
    // instance that has been created-- OR, throw an error
    if (!storeMap.has(StoreClass)) {
      throw new Error('Not a store class!');
    }

    return storeMap.get(StoreClass);
  }

  // Iterates over the store map to create a
  // serialized version of state that can be sent down the
  // wire
  getStore.toJS = function getStoreToJS() {
    return [...storeToJS(storeMap)];
  };

  getStore.dehydrate = function dehydrate() {
    return JSON.stringify(this.toJS());
  };

  return getStore;
}

// These are the context types that can be passed down to
// `this.context` in our React chain
const contextTypes = {
  router: React.PropTypes.object, // react-router
  store: React.PropTypes.func,
};

// Higher-order function that 'wraps' our <Router> and gives
// `this.context` down the chain
export class Provider extends Component {
  // Instantiate a `store` and pass it down the chain.  Since
  // we'll only use <Provider> once, we can do it here without
  // requiring an explicit invocation outside of this component
  getChildContext() {
    return Object.assign({
      store: this.props.store,
    }, this.props.context);
  }

  // Simply <Provider>'s children
  render() {
    return this.props && this.props.children;
  }
}

// @connect decorator function that turns a React component
// into a mobX 'observer' -- allowing it to access state, listen
// to changes, and dispatch state events
export function connect(component) {
  // Assign the contextTypes over to our inner component
  Object.assign(component, { contextTypes });

  // We'll use mobx-react's `observer` function as our higher
  // order component, so that React can listen to any stores
  return observer(component);
}

// Helper to map new properties to an existing mobx map
export function mergeMap(map, id, props) {
  return map.set(id, extendObservable(map.get(id) || {}, props));
}

// Our <Provider>'s own proptypes
Provider.propTypes = {
  children: React.PropTypes.node,
  context: React.PropTypes.shape(contextTypes),
  store: React.PropTypes.func.isRequired,
};

// The context that will be passed down to children
Provider.childContextTypes = contextTypes;
