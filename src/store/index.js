// Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

import { createStore } from 'vuex';

import Timer from '../entities/Timer';
import localStoragePlugin from './plugins';

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
      updateTimerName(context, payload) {
        return context.commit('UPDATE_TIMER_NAME', payload);
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
      },
    },
    mutations: {
      ADD_TIMER(state, payload) {
        const newTimer = {
          id: payload.id ?? state.lastTimerId,
          name: payload.name,
          timestamps: payload.timestamps ?? [],
        };

        state.timers.push(newTimer);
        // eslint-disable-next-line no-param-reassign
        state.lastTimerId += 1;
      },
      DELETE_ALL_TIMERS(state) {
        // eslint-disable-next-line no-param-reassign
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
          (timer) => timer.id === payload.id,
        );

        state.timers[timerIndex].timestamps.push(payload.dateTime);
      },
      UPDATE_TIMER_NAME(state, payload) {
        const timerIndex = state.timers.findIndex(
          (timer) => timer.id === payload.id,
        );

        // eslint-disable-next-line no-param-reassign
        state.timers[timerIndex].name = payload.name;
      },
    },
    plugins: [localStoragePlugin],
    state: {
      lastTimerId: 0,
      timers: [],
    },
  },
);

export default store;
