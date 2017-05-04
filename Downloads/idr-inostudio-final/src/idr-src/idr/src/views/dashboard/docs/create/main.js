/* eslint-disable react/no-unused-prop-types */

// React libraries
import React from 'react';
import cn from 'classnames';

import { connect } from 'shared/store';
// SVGs
import TagIcon from 'views/icons/tag';
import CalendarIcon from 'views/icons/calendar';
import CloseIcon from 'views/icons/close';

/* components */
import RecallStore from 'stores/dashboard/recall';

/* components */
import TagBar from 'views/dashboard/layout/tag-bar';
import Calendar from 'views/common/calendar';
import ButtonsContainer from 'views/dashboard/layout/buttons-container';
import TextField from 'views/common/form/text-field';

/* selectors for hide bottom panel om mobile when keyboard is active */
import layout from 'views/dashboard/layout/container.css';
/* styling */
import styling from './main.css';

const CreateDocMain = props => {
  const { recall, isMobile } = props;

  const renderNativeDate = index => (
    <input
      type="date"
      className={styling['native-picker']}
      onChange={deadlineDate => recall.setDeadlineDate(index, deadlineDate.target.value)} />
  );
  const renderDatePicker = (item, index) => (
    <Calendar
      date={item}
      onDateChange={deadlineDate => recall.setDeadlineDate(index, deadlineDate)} />
  );
  const renderCalendar = recall.getDeadlines().map((date, i) => (
    <div
      key={i}
      className={styling.deadline}
      ref={e => {
        this.deadline = e;
      }}>
      <div className={styling['deadline-form']}>
        <input
          type="text"
          placeholder="Studying for?"
          value={date.label}
          onChange={e => recall.setDeadlineLabel(i, e.target.value)} />
        {isMobile ? renderNativeDate(i) : renderDatePicker(date.date, i)}
        <CalendarIcon />
      </div>
      <div className={styling.close}>
        <CloseIcon onClick={() => recall.removeDeadline(i)} />
      </div>
    </div>
  ));

  const renderAddDeadline = recall.getDeadlines().length > 2 ? null : (
    <button
      className={styling['add-deadline']}
      onClick={() => recall.addDeadline()}>+ Add new deadline</button>
  );

  const buttonsArray = [
    { title: 'Cancel', handleClick: props.onCancel },
    { title: props.isEdit ? 'Edit' : 'Save', handleClick: props.onSave },
  ];

  return (
    <div className={cn(styling['create-recall-wr'], layout['recall-container'])}>
      <div className={styling['create-recall']}>
        <div className={styling.row}>
          <TextField
            type="text"
            placeholder="Type in file name"
            name="fileName"
            errorMessage=""
            value={recall.fileName}
            onChange={(key, val) => recall.setFileName(val)}
            variant="dashboard"
            isTransparent />
        </div>
        <div className={cn(styling.row, styling.tags)}>
          <div className={styling.icon}>
            <TagIcon className={styling.rotate} />
          </div>
          <TagBar
            tags={recall.getTags()}
            addTag={recall.addTag}
            removeTag={recall.removeTag} />
        </div>
        <div className={cn(styling.row, styling.calendar)}>
          <div className={styling.icon}><CalendarIcon /></div>
          <div className={styling['input-container']}>
            <span className={styling.text}>Deadline:</span>
            <div className={styling['input-inner']}>
              {renderCalendar}
              {renderAddDeadline}
            </div>
          </div>
        </div>
      </div>
      <ButtonsContainer position={props.isEdit ? 'right' : 'base'} title="Save changes?" buttons={buttonsArray} />
    </div>
  );
};

CreateDocMain.propTypes = {
  /* stores */
  recall: React.PropTypes.instanceOf(RecallStore),

  /* bools */
  isMobile: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,

  /* functions */
  onCancel: React.PropTypes.func,
  onSave: React.PropTypes.func,
};


CreateDocMain.defaultProps = {
  recall: new RecallStore(),
  isMobile: false,
  isEdit: false,
  onCancel: () => { /* intentionally blank */
  },
  onSave: () => { /* intentionally blank */
  },
};

export default connect(CreateDocMain);
