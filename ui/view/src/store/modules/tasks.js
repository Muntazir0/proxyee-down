export default {
  namespaced: true,
  state: {
    tasks: [],
    newTaskShow: false,
    cellSize: 3,
    initFlag: true,
  },
  mutations: {
    setNewTaskShow(state, newTaskShow) {
      state.newTaskShow = newTaskShow;
    },
    setTasks(state, tasks) {
      if (state.initFlag) {
        state.initFlag = false;
      }
      if (tasks) {
        state.tasks = tasks.map((task1) => {
          state.tasks.forEach((task2) => {
            if (task2.id == task1.id) {
              task1.chunkInfoList.forEach((chunk, index) => {
                chunk.intervalTime = chunk.lastTime
                  - task2.chunkInfoList[index].lastTime;
                chunk.intervalDownSize = chunk.downSize
                  - task2.chunkInfoList[index].downSize;
                chunk.speedCount = task2.chunkInfoList[index].speedCount;
                if (chunk.intervalDownSize == 0) {
                  if (!chunk.speedCount) {
                    chunk.speedCount = 1;
                  } else {
                    chunk.speedCount++;
                  }
                } else {
                  chunk.speedCount = 1;
                }
              });
            }
            return false;
          });
          return task1;
        }).sort((task1, task2) => {
          return task2.startTime - task1.startTime;
        });
      }
    }
  }
}
