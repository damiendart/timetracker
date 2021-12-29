import { createStore } from 'vuex';
import Timer from "./entities/Timer";

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
          id: payload.id,
          name: payload.name.length > 0
            ? payload.name : `Timer #${payload.id + 1}`,
          timestamps: [],
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
      TOGGLE_TIMER(state, payload) {
        const timerIndex = state.timers.findIndex(
          (timer) => timer.id === payload.id
        );
        state.timers[timerIndex].timestamps.push(payload.dateTime);
      }
    },
    state: {
      timers: [],
    },
  },
);

export default store;
