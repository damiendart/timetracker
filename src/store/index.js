import { createStore } from 'vuex';

import Timer from "../entities/Timer";
import localStoragePlugin from "./plugins";

const store = createStore(
  {
    actions: {
      addTimer(context, payload) {
        return context.commit('ADD_TIMER', payload);
      },
      deleteAllTimers(context) {
        return context.commit('DELETE_ALL_TIMERS');
      },
      deleteTimer(context, payload) {
        return context.commit('DELETE_TIMER', payload);
      },
      initialiseStore(context, payload) {
        return context.commit('INITIALISE_STORE', payload);
      },
      toggleTimer(context, payload) {
        return context.commit('TOGGLE_TIMER', payload);
      },
    },
    getters: {
      allTimers(state) {
        return state.timers.map(
          (props) => new Timer(props),
        );
      },
      timerById: (state) => (id) => {
        const timerIndex = state.timers.findIndex(
          (timer) => timer.id === id,
        );

        return new Timer(state.timers[timerIndex]);
      }
    },
    mutations: {
      ADD_TIMER(state, payload) {
        const newTimer = {
          id: payload.id ?? state.lastTimerId++,
          name: payload.name,
          timestamps: payload.timestamps ?? [],
        }

        state.timers.push(newTimer);
      },
      DELETE_ALL_TIMERS(state) {
        state.timers = [];
      },
      DELETE_TIMER(state, payload) {
        state.timers.splice(
          state.timers.findIndex((timer) => timer.id === payload),
          1,
        );
      },
      INITIALISE_STORE(state, payload) {
        this.replaceState(Object.assign(state, payload));
      },
      TOGGLE_TIMER(state, payload) {
        const timerIndex = state.timers.findIndex(
          (timer) => timer.id === payload.id
        );
        state.timers[timerIndex].timestamps.push(payload.dateTime);
      }
    },
    plugins: [localStoragePlugin],
    state: {
      lastTimerId: 0,
      timers: [],
    },
  },
);

export default store;
