/* eslint-disable react/no-unused-prop-types */

// React libraries
import React from 'react';
import cn from 'classnames';

import { connect } from 'shared/store';
// SVGs
import TagIcon from 'views/icons/tag';
import CalendarIcon from 'views/icons/calendar';
import CloseIcon from 'views/icons/close';
import QuestionIcon from 'views/icons/question';
import AnswerIcon from 'views/icons/answer';

/* components */
import RecallStore from 'stores/dashboard/recall';

/* components */
import TagBar from 'views/dashboard/layout/tag-bar';
import Calendar from 'views/common/calendar';
import RichTextEditor from 'views/dashboard/components/rte';
import LinkIcon from 'views/icons/link';
import ButtonsContainer from 'views/dashboard/layout/buttons-container';

/* selectors for hide bottom panel om mobile when keyboard is active */
import layout from 'views/dashboard/layout/container.css';
/* styling */
import styling from './main.css';

const CreateRecallMain = props => {
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
        <div className={cn(styling.row, styling.wysiwyg)}>
          <div className={styling.icon}><QuestionIcon /></div>
          <RichTextEditor
            name="rte-question"
            content={recall.questionHTML}
            handleChange={html => recall.setQuestionHTML(html)}
            placeholderText="Type in a question" />
          {recall.errors.has('questionHTML') && (
            <div className={styling['error-message']}>{recall.errors.get('questionHTML')}</div>
          )}
        </div>
        <div className={cn(styling.row, styling.wysiwyg)}>
          <div className={styling.icon}><AnswerIcon /></div>
          <RichTextEditor
            name="rte-answer"
            content={recall.answerHTML}
            handleChange={html => recall.setAnswerHTML(html)}
            placeholderText="Type in an answer" />
          {recall.errors.has('answerHTML') && (
            <div className={styling['error-message']}>{recall.errors.get('answerHTML')}</div>
          )}
        </div>
        <div className={cn(styling.row, styling.tags)}>
          <div className={styling.icon}>
            <TagIcon className={styling.rotate} />
          </div>
          <TagBar
            tags={recall.getTags()}
            addTag={recall.addTag}
            removeTag={recall.removeTag} />
          {recall.errors.has('tags') && (
            <div className={styling['error-message']}>{recall.errors.get('tags')}</div>
          )}
        </div>
        <div className={cn(styling.row, styling.calendar)}>
          <div className={styling.icon}><CalendarIcon /></div>
          <div className={styling['input-container']}>
            <span className={styling.text}>Deadline:</span>
            <div className={styling['input-inner']}>
              {renderCalendar}
              {renderAddDeadline}
            </div>
            {recall.errors.has('deadlines') && (
              <div className={styling['error-message']}>{recall.errors.get('deadlines')}</div>
            )}
          </div>
        </div>
        <div className={styling.row}>
          <div className={styling.icon}>
            <LinkIcon className={styling.rotate} />
          </div>
          <div className={styling['input-container']}>
            <span className={styling.text}>Source:</span>
            {
              recall.sourceLink ?
                <a href={recall.sourceLink} className={styling.source}>{recall.sourceLabel}</a>
                : <span className={styling.source}>{recall.sourceLabel}</span>
            }
          </div>
        </div>
      </div>
      <ButtonsContainer position={props.buttonPosition} title="Save changes?" buttons={buttonsArray} />
    </div>
  );
};

CreateRecallMain.propTypes = {
  /* stores */
  recall: React.PropTypes.instanceOf(RecallStore),

  /* bools */
  isMobile: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,

  /* functions */
  onCancel: React.PropTypes.func,
  onSave: React.PropTypes.func,

  /* string */
  questionHTML: React.PropTypes.string,
  answerHTML: React.PropTypes.string,
  buttonPosition: React.PropTypes.string,
};


CreateRecallMain.defaultProps = {
  recall: new RecallStore(),
  isMobile: false,
  isEdit: false,
  onCancel: () => { /* intentionally blank */
  },
  onSave: () => { /* intentionally blank */
  },
};

export default connect(CreateRecallMain);
