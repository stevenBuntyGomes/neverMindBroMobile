import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/userReducer';
import categoryReducer from './Reducers/categoryReducer';
import tagReducer from './Reducers/tagReducer';
import notificationReducer from './Reducers/NotificationReducer';
import blogReducer from './Reducers/blogReducer';
import questionAnswerReducer from './Reducers/QuestionAnswerReducer';
import advertiseReducer from './Reducers/advertiseReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    tag: tagReducer,
    blog: blogReducer,
    questionAnswer: questionAnswerReducer,
    notification: notificationReducer,
    advertise: advertiseReducer,
  },
});

