import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    questions: [],
    questionsPopular: [],
    questionsTagsCategories: [],
    question:{},
    updatedQuestion: null,
    newQuestion: null,
    message: null,
    questionMessage: null,
    answerMessage: null,
    loading: false,
    error: null,
    categories: [],
    tags: [],
    size: 0,
    questionPopularSize: 0,
    questionTagsSize: 0,
    answerSize: 0,
    answerSize: 0,
    searchQuestion: [],
    searchUser: [],
    dialogStatus: false,
    answers: [],
    answer: null,
    newAnswer: null,
    deleteQuestionId: null,
    questionId: null,
    deleteAnswerId: null,
    updatedAnswer: null,
    profileQuestions: [],
    profileQuestionSize: 0,
};

const questionAnswerReducer = createSlice({
    name: 'questionAnswerReducer',
    initialState,
    reducers: {
        nullifyAnswer: (state, action) => {
            // state.answer = null;
            state.newAnswer = null;
        },
        nullifyMessage: (state, action) => {
            state.message = null;
            state.questionMessage = null;
            state.answerMessage = null;
        },         // asking questions
        createQuestionRequest: (state, action) => {
            state.loading = true;
        },
        createQuestionSuccess: (state, action) => {
            state.loading = false;
            state.questions = action.payload.questions;
            state.newQuestion = action.payload.question;
            state.size = action.payload.size;
            state.questionMessage = action.payload.message;
            state.dialogStatus = false;
        },
        createQuestionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // asking questions
        // remove new question notification reducer starts
        createQuestionNotificationRequest: (state, action) => {
            state.loading = true;
        },
        createQuestionNotificationSuccess: (state, action) => {
            state.loading = false;
            state.newQuestion = null;
        },
        createQuestionNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // remove new question notification reducer ends
        updateQuestionRequest: (state, action) => {
            state.loading = true;
        },
        updateQuestionSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.questionMessage = action.payload.message;
            const index = state.questions.findIndex((l) => l._id === action.payload.question._id);
            if(index !== -1){
                state.questions[index] = action.payload.question;
            }
        },
        updateQuestionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get question popular start
        getQuestionPopularRequest: (state, action) => {
            state.loading = true;
        },
        getQuestionPopularSuccess: (state, action) => {
            state.loading = false;
            state.questionsPopular = action.payload.questions;
            // state.size = action.payload.size;
            state.questionPopularSize = action.payload.size;
            state.message = action.payload.message;
        },
        getQuestionPopularFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // get question popular ends
        // getting questions
        getQuestionRequest: (state, action) => {
            state.loading = true;
        },
        getQuestionSuccess: (state, action) => {
            state.loading = false;
            state.questions = action.payload.questions;
            state.size = action.payload.size;
            state.message = action.payload.message;
        },
        getQuestionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // getting questions
        // getting questions of tags and categories
        getQuestionCatTagsRequest: (state, action) => {
            state.loading = true;
        },
        getQuestionCatTagsSuccess: (state, action) => {
            state.loading = false;
            state.questionsTagsCategories = action.payload.questions;
            state.questionTagsSize = action.payload.size;
            state.message = action.payload.message;
        },
        getQuestionCatTagsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // getting questions of tags and categories
        // answer to the questions 
        addAnswerRequest: (state, action) => {
            state.loading = true;
        },
        addAnswerSuccess: (state, action) => {
            state.loading = false;
            state.questions = action.payload.questions;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.newAnswer = action.payload.answer;
            state.size = action.payload.size;
            state.message = action.payload.message;
        },
        addAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // answer to the questions 
        // update answer on quesiton reducer
        updateAnswerRequest: (state, action) => {
            state.loading = true;
        },  
        updateAnswerSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.updatedAnswer = action.payload.answer;
            state.message = action.payload.message;
            state.answerMessage = action.payload.message;
        },
        updateAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // update answer on quesiton reducer
        // read single question reducer
        readSingleQuestionRequest: (state, action) => {
            state.loading = true;
        },
        readSingleQuestionSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answers = action.payload.answers;
            state.answerSize = action.payload.size;
            state.answer = null;
            state.newAnswer = null;
            state.message = action.payload.message;
        },
        readSingleQuestionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // read single question reducer
        // like unlike answer reducer
        likeUnlikeAnswerRequest: (state, action) => {
            state.loading = true;
        },
        likeUnlikeAnswerSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            // state.answers = action.payload.answers;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        likeUnlikeAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // like unlike answer reducer
        // getReaction answer starts
        getReactionAnswerRequest: (state, action) => {
            state.loading = true;
        },
        getReactionAnswerSuccess: (state, action) => {
            state.loading = false;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        getReactionAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // getReaction answer ends
        // comment on question
        addCommentOnAnswerRequest: (state, action) => {
            state.loading = true;
        },
        addCommentOnAnswerSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        addCommentOnAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // comment on question
        // add remove comment like on answer
        addRemoveCommentLikeAnswerRequest: (state, action) => {
            state.loading = true;
        },
        addRemoveCommentLikeAnswerSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        addRemoveCommentLikeAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // add remove comment like on answer
        // update comment on answer reducer
        updateCommentOnAnswerActionRequest: (state, action) => {
            state.loading = true;
        },
        updateCommentOnAnswerActionuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        updateCommentOnAnswerActionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // update comment on answer reducer
        // delete comment answer start
        deleteCommentOnAnswerRequest: (state, action) => {
            state.loading = true;
        },
        deleteCommentOnAnswerSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        deleteCommentOnAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // delete comment answer ends
        // add new reply to comment of answer
        addReplyOnAnswerCommentRequest: (state, action) => {
            state.loading = true;
        },
        addReplyOnAnswerCommentSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        addReplyOnAnswerCommentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // add new reply to comment of answer
        // add remove reply like in answer
        addRemoveLikeinAnswerReplyRequest: (state, action) => {
            state.loading = true;
        },
        addRemoveLikeinAnswerReplySuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        addRemoveLikeinAnswerReplyFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // add remove reply like in answer
        // update reply answer starts
        updateReplyAnswerRequest: (state, action) => {
            state.loading = true;
        },
        updateReplyAnswerSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        updateReplyAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // update reply answer starts
        // delete reply 
        deleteReplyOnCommentAnswerRequest: (state, action) => {
            state.loading = true;
        },
        deleteReplyOnCommentAnswerSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.message = action.payload.message;
        },
        deleteReplyOnCommentAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // delete reply 
        // get user profile question answer
        // get user profile question answer
        followUnfollowQuestionRequest: (state, action) => {
            state.loading = true;
        },
        followUnfollowQuestionSuccess: (state, action) => {
            state.loading = false;
            state.question = action.payload.question;
            // state.answers = action.payload.answers;
        },
        followUnfollowQuestionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // profile information questions show
        getProfileQuestionRequest: (state, action) => {
            state.loading = true;
        },
        getProfileQuestionSuccess: (state, action) => {
            state.loading = false;
            state.profileQuestions = action.payload.questions;
            state.profileQuestionSize = action.payload.size;
            state.message = action.payload.message;
        },
        getProfileQuestionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // profile information questions show
        // profile information answers
        getProfileAnswerRequest: (state, action) => {
            state.loading = true;
        },
        getProfileAnswerSuccess: (state, action) => {
            state.loading = false;
            state.answers = action.payload.answers;
            state.answerSize = action.payload.size;
            state.message = action.payload.message;
        },
        getProfileAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },

        // delete question reducer
        deleteQuestionRequest: (state, action) => {
            state.loading = true;
        },
        deleteQuestionSuccess: (state, action) => {
            state.loading = false;
            state.deleteQuestionId = action.payload.questionid;
        },
        deleteQuestionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        // delete question reducer
        // delete answer reducer
        deleteAnswerRequest: (state, action) => {
            state.loading = true;
        },
        deleteAnswerSuccess: (state, action) => {
            state.loading = false;
            state.questionId = action.payload.questionId;
            state.deleteAnswerId = action.payload.answerId;
        },
        deleteAnswerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    }
});

export const {
    nullifyAnswer,
    createQuestionRequest,
    createQuestionSuccess,
    createQuestionFailure,
    createQuestionNotificationRequest,
    createQuestionNotificationSuccess,
    createQuestionNotificationFailure,
    updateQuestionRequest,
    updateQuestionSuccess,
    updateQuestionFailure,
    getQuestionRequest,
    getQuestionSuccess,
    getQuestionFailure,
    getQuestionPopularRequest,
    getQuestionPopularSuccess,
    getQuestionPopularFailure,
    getQuestionCatTagsRequest,
    getQuestionCatTagsSuccess,
    getQuestionCatTagsFailure,
    addAnswerRequest,
    addAnswerSuccess,
    addAnswerFailure,
    updateAnswerRequest,
    updateAnswerSuccess,
    updateAnswerFailure,
    readSingleQuestionRequest,
    readSingleQuestionSuccess,
    readSingleQuestionFailure,
    likeUnlikeAnswerRequest,
    likeUnlikeAnswerSuccess,
    likeUnlikeAnswerFailure,
    getReactionAnswerRequest,
    getReactionAnswerSuccess,
    getReactionAnswerFailure,
    addCommentOnAnswerRequest,
    addCommentOnAnswerSuccess,
    addCommentOnAnswerFailure,
    addRemoveCommentLikeAnswerRequest,
    addRemoveCommentLikeAnswerSuccess,
    addRemoveCommentLikeAnswerFailure,
    updateCommentOnAnswerActionRequest,
    updateCommentOnAnswerActionuccess,
    updateCommentOnAnswerActionFailure,
    deleteCommentOnAnswerRequest,
    deleteCommentOnAnswerSuccess,
    deleteCommentOnAnswerFailure,
    addReplyOnAnswerCommentRequest,
    addReplyOnAnswerCommentSuccess,
    addReplyOnAnswerCommentFailure,
    addRemoveLikeinAnswerReplyRequest,
    addRemoveLikeinAnswerReplySuccess,
    addRemoveLikeinAnswerReplyFailure,
    updateReplyAnswerRequest,
    updateReplyAnswerSuccess,
    updateReplyAnswerFailure,
    deleteReplyOnCommentAnswerRequest,
    deleteReplyOnCommentAnswerSuccess,
    deleteReplyOnCommentAnswerFailure,
    followUnfollowQuestionRequest,
    followUnfollowQuestionSuccess,
    followUnfollowQuestionFailure,
    getProfileQuestionRequest,
    getProfileQuestionSuccess,
    getProfileQuestionFailure,
    getProfileAnswerRequest,
    getProfileAnswerSuccess,
    getProfileAnswerFailure,
    deleteQuestionRequest,
    deleteQuestionSuccess,
    deleteQuestionFailure,
    deleteAnswerRequest,
    deleteAnswerSuccess,
    deleteAnswerFailure,
    nullifyMessage,
} = questionAnswerReducer.actions;

export default questionAnswerReducer.reducer;
// export const questionAnswerReducerOld = createReducer(initialState, {
//     // asking questions
//     createQuestionRequest: (state, action) => {
//         state.loading = true;
//     },
//     createQuestionSuccess: (state, action) => {
//         state.loading = false;
//         state.questions = action.payload.questions;
//         state.newQuestion = action.payload.question;
//         state.size = action.payload.size;
//         state.message = action.payload.message;
//         state.dialogStatus = false;
//     },
//     createQuestionFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // asking questions
//     // remove new question notification reducer starts
//     createQuestionNotificationRequest: (state, action) => {
//         state.loading = true;
//     },
//     createQuestionNotificationSuccess: (state, action) => {
//         state.loading = false;
//         state.newQuestion = null;
//     },
//     createQuestionNotificationFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // remove new question notification reducer ends
//     updateQuestionRequest: (state, action) => {
//         state.loading = true;
//     },
//     updateQuestionSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//     },
//     updateQuestionFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // getting questions
//     getQuestionRequest: (state, action) => {
//         state.loading = true;
//     },
//     getQuestionSuccess: (state, action) => {
//         state.loading = false;
//         state.questions = action.payload.questions;
//         state.size = action.payload.size;
//         state.message = action.payload.message;
//     },
//     getQuestionFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // getting questions
//     // getting questions of tags and categories
//     getQuestionCatTagsRequest: (state, action) => {
//         state.loading = true;
//     },
//     getQuestionCatTagsSuccess: (state, action) => {
//         state.loading = false;
//         state.questionsTagsCategories = action.payload.questions;
//         state.size = action.payload.size;
//         state.message = action.payload.message;
//     },
//     getQuestionCatTagsFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // getting questions of tags and categories
//     // answer to the questions 
//     addAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     addAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.questions = action.payload.questions;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.newAnswer = action.payload.answer;
//         state.size = action.payload.size;
//         state.message = action.payload.message;
//     },
//     addAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // answer to the questions 
//     // update answer on quesiton reducer
//     updateAnswerRequest: (state, action) => {
//         state.loading = true;
//     },  
//     updateAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     updateAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // update answer on quesiton reducer
//     // read single question reducer
//     readSingleQuestionRequest: (state, action) => {
//         state.loading = true;
//     },
//     readSingleQuestionSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answers = action.payload.answers;
//         state.answer = null;
//         state.newAnswer = null;
//         state.message = action.payload.message;
//     },
//     readSingleQuestionFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // read single question reducer
//     // like unlike answer reducer
//     likeUnlikeAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     likeUnlikeAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         // state.answers = action.payload.answers;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     likeUnlikeAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // like unlike answer reducer
//     // getReaction answer starts
//     getReactionAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     getReactionAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     getReactionAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // getReaction answer ends
//     // comment on question
//     addCommentOnAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     addCommentOnAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     addCommentOnAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // comment on question
//     // add remove comment like on answer
//     addRemoveCommentLikeAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     addRemoveCommentLikeAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     addRemoveCommentLikeAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // add remove comment like on answer
//     // update comment on answer reducer
//     updateCommentOnAnswerActionRequest: (state, action) => {
//         state.loading = true;
//     },
//     updateCommentOnAnswerActionuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     updateCommentOnAnswerActionFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // update comment on answer reducer
//     // delete comment answer start
//     deleteCommentOnAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteCommentOnAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     deleteCommentOnAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // delete comment answer ends
//     // add new reply to comment of answer
//     addReplyOnAnswerCommentRequest: (state, action) => {
//         state.loading = true;
//     },
//     addReplyOnAnswerCommentSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     addReplyOnAnswerCommentFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // add new reply to comment of answer
//     // add remove reply like in answer
//     addRemoveLikeinAnswerReplyRequest: (state, action) => {
//         state.loading = true;
//     },
//     addRemoveLikeinAnswerReplySuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     addRemoveLikeinAnswerReplyFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // add remove reply like in answer
//     // update reply answer starts
//     updateReplyAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     updateReplyAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     updateReplyAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // update reply answer starts
//     // delete reply 
//     deleteReplyOnCommentAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteReplyOnCommentAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         state.answer = action.payload.answer;
//         state.message = action.payload.message;
//     },
//     deleteReplyOnCommentAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // delete reply 
//     // get user profile question answer
//     // get user profile question answer
//     followUnfollowQuestionRequest: (state, action) => {
//         state.loading = true;
//     },
//     followUnfollowQuestionSuccess: (state, action) => {
//         state.loading = false;
//         state.question = action.payload.question;
//         // state.answers = action.payload.answers;
//     },
//     followUnfollowQuestionFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // profile information questions show
//     getProfileQuestionRequest: (state, action) => {
//         state.loading = true;
//     },
//     getProfileQuestionSuccess: (state, action) => {
//         state.loading = false;
//         state.questions = action.payload.questions;
//         state.size = action.payload.size;
//         state.message = action.payload.message;
//     },
//     getProfileQuestionFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // profile information questions show
//     // profile information answers
//     getProfileAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     getProfileAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.answers = action.payload.answers;
//         state.answerSize = action.payload.size;
//         state.message = action.payload.message;
//     },
//     getProfileAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },

//     // delete question reducer
//     deleteQuestionRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteQuestionSuccess: (state, action) => {
//         state.loading = false;
//         state.deleteQuestionId = action.payload.questionid;
//     },
//     deleteQuestionFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // delete question reducer
//     // delete answer reducer
//     deleteAnswerRequest: (state, action) => {
//         state.loading = true;
//     },
//     deleteAnswerSuccess: (state, action) => {
//         state.loading = false;
//         state.questionId = action.payload.questionId;
//         state.deleteAnswerId = action.payload.answerId;
//     },
//     deleteAnswerFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     // delete answer reducer
    
//     // profile information answers
// });

