import moment from 'moment';
import * as types from './types';

const INITIAL_STATE = {
  userProfile: {},
  stepsTutorial: 0,
  defaultData: {
    feeling: [],
    ways: [],
    areas: [],
    categories: {},
    themes: [],
    link: {},
  },
  quotes: {
    listData: [],
    currentPage: 1,
    isLoading: false,
    totalQuotes: null,
  },
  collections: [],
  showModalPremium: false,
  pastQuoteList: [],
  listLikedQuote: {},
  dataCollection: {},
  activeVersion: null,
  modalFirstPremium: false,
  listQuoteRef: null,
  haveBeenAskRating: null,
  registerData: null,
  loadingModal: {
    visible: false,
    counter: 0,
  },
  todayAdsLimit: 12,
  listBasicQuote: [],
  restPassLength: 0,
  runAnimationSlide: false,
  finishInitialLoader: false,
  paywallNotifcation: null,
  animationCounter: true,
  freeUserPremium: false,
  userStory: null,
  colorTheme: null,
  fontFamily: null,
  fontSize: 16,
  backgroundColor: null,
  isPremium: false,
  readStory: null,
  listenStory: null,
  nextStory: null,
  relateStory: null,
  levelingUser: null,
  colorText: '',
  page: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_ANIMATION_COUNTER:
      return {
        ...state,
        animationCounter: action.payload,
      };
    case types.SET_PAYWALL_NOTIFICATION:
      return {
        ...state,
        paywallNotifcation: action.payload,
      };
    case types.SET_INITIAL_FINISH_LOADER:
      return {
        ...state,
        finishInitialLoader: action.payload,
      };
    case types.SET_ANIMATION_SLIDE_DATA:
      return {
        ...state,
        runAnimationSlide: action.payload,
      };
    case types.SET_TODAY_ADS_LIMIT:
      return {
        ...state,
        todayAdsLimit: 12,
        restPassLength: 0,
        freeUserPremium: false,
      };
    case types.SHOW_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          visible: true,
          counter: 0,
        },
      };
    case types.SET_LEVELING_DATA:
      return {
        ...state,
        levelingUser: action.payload,
      };
    case types.CHANGE_COUNTER_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          ...state.loadingModal,
          counter: action.payload,
        },
      };
    case types.HIDE_LOADING_MODAL:
      return {
        ...state,
        loadingModal: {
          ...state.loadingModal,
          visible: false,
        },
      };
    case types.SET_REGISTER_STEP: {
      return {
        ...state,
        registerData: {
          ...action.payload,
        },
      };
    }
    case types.SET_LIST_QUOTE_REF:
      return {
        ...state,
        listQuoteRef: action.payload,
      };
    case types.SET_MODAL_FIRST_PREMIUM:
      return {
        ...state,
        modalFirstPremium: action.payload,
      };
    case types.SET_APP_VERSION:
      return {
        ...state,
        userProfile: {},
        registerData: null,
        listLikedQuote: {
          listDataLike: [],
        },
        collections: [],
        quotes: {
          listData: [],
          currentPage: 1,
          isLoading: false,
        },
        activeVersion: action.payload,
      };
    case types.SET_MODAL_PREMIUM_VISIBILITY:
      return {
        ...state,
        showModalPremium: action.payload,
      };
    case types.START_FETCH_COLLECTION:
      return {
        ...state,
      };
    case types.SUCCESS_FETCH_COLLECTION:
      return {
        ...state,
        collections: action.payload,
      };
    case types.ERROR_FETCH_COLLECTION:
      return {
        ...state,
      };
    case types.START_FETCH_QUOTES:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          currentPage: 1,
          isLoading: true,
        },
      };
    case types.SET_NEW_QUOTE_DATA:
      return {
        ...state,
        quotes: {
          quotes: null,
          listData: action.payload,
        },
      };
    case types.SUCCESS_FETCH_QUOTE:
      return {
        ...state,
        freeUserPremium: action.isFreeUserPremium,
        restPassLength: action.restPassLength,
        todayAdsLimit:
          action.isPassPremium || state.todayAdsLimit > 17
            ? 99
            : 12 + action.restPassLength,
        quotes: {
          listData: action.arrData,
          currentPage: 1,
          isLoading: false,
          totalQuotes: action.payload.total,
        },
        listBasicQuote: action.listBasicQuote,
      };
    case types.ERROR_FETCH_QUOTES:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          isLoading: false,
        },
      };
    case types.START_PAST_QUOTES:
      return {
        ...state,
      };
    case types.SUCCESS_PAST_QUOTES:
      return {
        ...state,
        pastQuoteList: action.payload,
      };
    case types.ERROR_PAST_QUOTES:
      return {
        ...state,
      };
    case types.START_LIKE_QUOTE:
      return {
        ...state,
      };
    case types.SUCCESS_LIKE_QUOTE:
      return {
        ...state,
        listLikedQuote: action.payload,
      };
    case types.ERROR_LIKE_QUOTE:
      return {
        ...state,
      };
    case types.SET_DEFAULT_DATA:
      return {
        ...state,
        defaultData: {
          categories: action.categories,
          listFactRegister: action.listFactRegister,
        },
      };
    case types.SET_PROFILE_DATA:
      return {
        ...state,
        userProfile: action.payload,
      };
    case types.SET_STEP_TUTORIAL:
      return {
        ...state,
        stepsTutorial: action.payload,
      };
    case types.SET_STORY_DATA:
      return {
        ...state,
        userStory: action.payload,
      };
    case types.SET_STORY_NEXT_DATA:
      return {
        ...state,
        nextStory: action.payload,
      };
    case types.SET_READ_STORY:
      return {
        ...state,
        readStory: action.payload,
      };
    case types.SET_LISTEN_STORY:
      return {
        ...state,
        listenStory: action.payload,
      };

    case types.SET_STORY_RELATE_DATA:
      return {
        ...state,
        relateStory: action.payload,
      };
    case types.SET_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: action.payload,
      };
    case types.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload,
      };
    case types.SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload,
      };
    case types.SET_COLOR_THEME:
      return {
        ...state,
        colorTheme: action.payload,
      };
    case types.SET_STORAGE_STATUS:
      return {
        ...state,
        storageStatus: action.payload,
      };

    case types.CHANGE_ASK_RATING_PARAMETER:
      return {
        ...state,
        haveBeenAskRating: moment().format('YYYY-MM-DD'),
      };
    case types.SET_LIKE_STATUS:
      return {
        ...state,
        quotes: {
          ...state.quotes,
          listData: state.quotes.listData.map(item => {
            if (item.id === action.payload) {
              let isLiked = false;
              if (!item.like) {
                isLiked = false;
              }
              if (item.like) {
                if (item.like?.type) {
                  if (item.like?.type === '1' || item.like?.type === 1) {
                    isLiked = true;
                  }
                }
              }
              return {
                ...item,
                like: {
                  ...item.like,
                  flag: isLiked ? 'dislike' : 'like',
                  type: isLiked ? 2 : 1,
                },
              };
            }
            return item;
          }),
        },
      };
    case types.SET_USER_PREMIUM:
      return {
        ...state,
        isPremium: action.payload,
      };
    case types.SET_COLOR_TEXT:
      return {
        ...state,
        colorText: action.payload,
      };
    case types.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};
