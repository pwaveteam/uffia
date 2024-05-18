import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: 'persist_root',
  storage: localStorage,
})

const PersonalAtom = atom({
  key: 'SurveyAtom',
  default: {
    firstName: '',
    lastName: '',
    email: '',
    callingCode: '+82',
    call: '',
    nation: '',
    company: ''
  },
  effects_UNSTABLE: [persistAtom],
})

const AnswerAtom = atom({
  key: 'AnswerAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
})


export {
  PersonalAtom,
  AnswerAtom
}
