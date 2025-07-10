<template>
  <v-card class="bg-background rounded-lg elevation-0">
    <v-card-title
      class="border-b-thin text-h6 font-weight-bold py-4"
    >Kanban Board</v-card-title>

    <v-card-text class="mt-4 d-flex overflow-x-auto" style="min-height: calc(100vh - 200px);">
      <v-card
        v-for="(board, index) in boards"
        :key="board.value"
        class="bg-container-bg rounded-lg elevation-0 mx-2 flex-shrink-0"
        width="300px">
        <v-card-title class="text-subtitle-1 font-weight-bold">{{ board.title }}</v-card-title>
        <ItemScrollableCard
          :height="650"
          class="drop-zone"
          @drop="onDrop($event, board.value)"
          @dragover.prevent
          @dragenter.prevent
        >
          <v-card
            v-for="(task, taskIndex) in board.tasks"
            :key="taskIndex"
            class="rounded-lg elevation-0 my-2 draggable-task"
            draggable="true"
            @dragstart="onDragStart($event, task)"
            @click="dialog = true; currentTask = task"
          >
            <v-responsive
              v-if="task.image"
              :aspect-ratio="4/3"
            >
              <v-img
                :src="task.image"
                cover
              />
            </v-responsive>
            <v-card-title class="d-flex align-center ga-2">
              <KanbanLabel
                v-for="(label, labelIndex) in task.labels"
                :key="labelIndex"
                :color="label.color"
                :label="label.name"
              />
            </v-card-title>
            <v-card-title class="text-subtitle-2 font-weight-bold pt-0">{{ task.title }}</v-card-title>
            <v-card-text class="d-flex ga-2">
              <v-chip
                v-if="task.dueDate"
                label prepend-icon="mdi-calendar-clock" color="amber-lighten-3" variant="flat"
              >{{ useDateFormat(task.dueDate, 'MMM DD') }}</v-chip>
              <v-chip
                v-if="task.comments.length"
                label prepend-icon="mdi-message"
              >{{ task.comments.length }}</v-chip>
              <div class="d-flex align-center justify-end flex-grow-1">
                <KanbanAvatar
                  v-for="(member, memberIndex) in task.members"
                  :key="memberIndex"
                  :source="member.avatar"
                />
              </div>
            </v-card-text>
          </v-card>
        </ItemScrollableCard>
        <v-card-actions>
          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-plus-circle-outline"
            width="100%"
            @click="addTaskdialog = true; currentBoard = board.value"
          >Add Task</v-btn>
        </v-card-actions>
      </v-card>

      <v-card
        class="bg-container-bg rounded-lg elevation-0 mx-2 flex-shrink-0"
        width="300px"
      >
        <v-card-actions>
          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-plus-box"
            width="100%"
            @click="addBoardDialog = true"
          >Add Board</v-btn>
        </v-card-actions>
      </v-card>
    </v-card-text>

    <!-- Add Task Dialog -->
    <v-dialog
      v-model="addTaskdialog"
      max-width="300px"
    >
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="newTaskTitle"
            label="Task Title"
            variant="outlined"
            hide-details
            density="compact"
            append-inner-icon="mdi-send"
            color="primary"
            @click:append-inner="addTaskToBoard()"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Add Task Dialog -->
    <v-dialog
      v-model="addBoardDialog"
      max-width="300px"
    >
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="newBoardTitle"
            label="Board Title"
            variant="outlined"
            hide-details
            density="compact"
            append-inner-icon="mdi-plus"
            color="primary"
            @click:append-inner="addNewBoard()"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Task Details Dialog -->
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-sheet>
        <!-- Task title & Assignees & Labels -->
        <v-row no-gutters>
          <v-col cols="1" sm="1" md="1" lg="1">
            <v-icon icon="mdi-file-document-edit" size="x-large" class="mx-2 my-4"/>
          </v-col>
          <v-col cols="11" sm="11" md="11" lg="11">
            <v-card-title class="text-h6 font-weight-bold d-flex align-center">
              <v-text-field
                v-model="currentTask.title"
                variant="plain"
                class="flex-grow-1"
                hide-details
                density="compact"
              />
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false" variant="text">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <!-- Task title -->
            <v-card-title class="d-flex justify-space-between align-center">
              <!-- Members -->
              <div class="members d-flex flex-column">
                <span class="text-subtitle-2">Members</span>
                <div>
                  <KanbanAvatar
                    v-for="(member, index) in currentTask.members"
                    :key="index"
                    :source="member.avatar"
                  />
                  <v-btn icon size="30" style="margin-left: -10px;">
                    <v-icon>mdi-plus</v-icon>
                    <v-menu activator="parent" :close-on-content-click="false">
                      <v-sheet>
                        <v-list density="compact" nav>
                          <v-list-item
                            v-for="(member, index) in members"
                            :key="index"
                            :title="member.name"
                            :value="member.id"
                            link
                          >
                            <template #prepend>
                              <div class="d-flex align-center">
                                <v-checkbox
                                  :model-value="currentTask.members.some(m => m.id === member.id)"
                                  class="mr-4"
                                  color="primary"
                                  hide-details
                                  density="compact"
                                  @click="addMemberToTask(member)"
                                />
                                <KanbanAvatar
                                  :source="member.avatar"
                                />
                              </div>
                            </template>
                          </v-list-item>
                        </v-list>
                      </v-sheet>
                    </v-menu>
                  </v-btn>
                </div>
              </div>

              <!-- Labels -->
              <div class="members d-flex flex-column">
                <span class="text-subtitle-2">Labels</span>
                <div class="d-flex align-center ga-2">
                  <v-chip
                    v-for="(label, index) in currentTask.labels"
                    :key="index"
                    :color="label.color"
                    label variant="elevated"
                  >{{ label.name }}</v-chip>
                  <v-btn icon size="30">
                    <v-icon>mdi-plus</v-icon>
                    <v-menu activator="parent" :close-on-content-click="false">
                      <v-sheet>
                        <v-list density="compact" nav>
                          <v-list-item
                            v-for="(item, index) in labels"
                            :key="index"
                            :value="item.name"
                            link
                          >
                            <template #prepend>
                              <v-checkbox
                                :model-value="currentTask.labels.some(label => label.name === item.name)"
                                class="mr-2"
                                color="primary"
                                hide-details
                                density="compact"
                                @click="toggleLabelInTask(item)"
                              />
                            </template>
                            <template #title>
                              <v-chip label variant="elevated" :color="item.color" size="small">{{ item.name }}</v-chip>
                            </template>
                          </v-list-item>
                        </v-list>
                      </v-sheet>
                    </v-menu>
                  </v-btn>
                </div>
              </div>
            </v-card-title>
          </v-col>
        </v-row>

        <v-divider class="my-2"></v-divider>

        <ItemScrollableCard
          :height="400"
        >
          <!-- Task Descriptin -->
          <v-row no-gutters class="my-2">
            <v-col cols="1" sm="1" md="1" lg="1">
              <v-icon icon="mdi-text-box-outline" size="x-large" class="ma-2"/>
            </v-col>
            <v-col cols="11" sm="11" md="11" lg="11">
              <v-card-title class="text-subtitle-1">Description</v-card-title>
              <v-card-title class="py-0">
                <v-textarea
                  :model-value="currentTask.description"
                  variant="outlined"
                  hide-details
                  density="compact"
                  rows="4"
                ></v-textarea>
              </v-card-title>
            </v-col>
          </v-row>

          <!-- Task Attachments -->
          <v-row no-gutters class="my-4">
            <v-col cols="1" sm="1" md="1" lg="1">
              <v-icon icon="mdi-paperclip" size="x-large" class="ma-2"/>
            </v-col>
            <v-col cols="11" sm="11" md="11" lg="11">
              <v-card-title class="text-subtitle-1">Attachments</v-card-title>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" md="6" lg="6">
                    <v-sheet>
                      <v-list-item class="border-thin pa-1 rounded-lg">
                        <template #prepend>
                          <v-responsive :aspect-ratio="16/9">
                            <v-img
                              src="https://picsum.photos/id/1/50/70"
                              width="70"
                              height="70"
                              cover
                              rounded="lg"
                            />
                          </v-responsive>
                        </template>
                        <template #title>
                          <span class="text-subtitle-2 ml-2">Attachment 1</span>
                        </template>
                        <template #subtitle>
                          <div class="d-flex align-center ml-2">
                            <v-icon color="grey" size="small">mdi-star</v-icon>
                            <span class="text-caption">55 KB</span>
                          </div>
                        </template>
                        <template #append>
                          <v-btn icon size="20" variant="text">
                            <v-icon>mdi-dots-vertical</v-icon>
                            <v-menu activator="parent" :close-on-content-click="false">
                              <v-list density="compact" nav slim>
                                <v-list-item
                                  title="Download"
                                  prepend-icon="mdi-download"
                                  link
                                />
                              <v-list-item
                                  title="Mark Cove "
                                  prepend-icon="mdi-image"
                                  link
                                />
                                <v-list-item
                                  title="Delete"
                                  prepend-icon="mdi-delete"
                                  link
                                />
                              </v-list>
                            </v-menu>
                          </v-btn>
                        </template>
                      </v-list-item>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>

          <v-divider class="my-2"></v-divider>

          <!-- Task Comment -->
          <v-row no-gutters class="my-4">
            <v-col cols="1" sm="1" md="1" lg="1">
              <v-icon icon="mdi-comment-text-outline" size="x-large" class="ma-2"/>
            </v-col>
            <v-col cols="11" sm="11" md="11" lg="11">
              <v-card-title class="text-subtitle-1">Comments</v-card-title>
              <v-card
                v-for="(comment, index) in currentTask.comments"
                :key="index"
                :prepend-avatar="comment.member.avatar"
                class="rounded-lg elevation-0 my-2"
              >
                <template #title>
                  <span class="text-subtitle-2">{{ comment.member.name }}</span>
                </template>
                <template #subtitle>
                  <span class="text-caption">{{ useTimeAgo(comment.timestamp) }}</span>
                </template>
                <template #text>
                  <p class="text-body-2">{{ comment.text }}</p>
                </template>
              </v-card>

              <v-list-item
                prepend-avatar="https://cdn.vuetifyjs.com/images/lists/5.jpg"
              >
                <v-text-field
                  v-model="taskComment"
                  placeholder="Add a comment..."
                  variant="outlined"
                  hide-details
                  density="compact"
                  append-inner-icon="mdi-send"
                  color="primary"
                  @click:append-inner="addCommentToTask"
                />
              </v-list-item>
            </v-col>
          </v-row>
        </ItemScrollableCard>
      </v-sheet>
    </v-dialog>
  </v-card>
</template>
<script setup lang="ts">
import { fa, faker } from '@faker-js/faker';
const dialog = ref(false);
const currentTask = ref();
const taskComment = ref('');
const addTaskdialog = ref(false);
const newTaskTitle = ref('');
const currentBoard = ref('');
const newBoardTitle = ref('');
const addBoardDialog = ref(false);
const draggedTask = ref<any>(null);

const members = ref([
  { id: 1, name: faker.person.fullName(), avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
  { id: 2, name: faker.person.fullName(), avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
  { id: 3, name: faker.person.fullName(), avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
  { id: 4, name: faker.person.fullName(), avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
  { id: 5, name: faker.person.fullName(), avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
]);

const labels = ref([
  { name: 'Feature', color: '#1e88e5' },
  { name: 'Bug', color: '#d32f2f' },
  { name: 'High Priority', color: '#f57c00' },
  { name: 'Design', color: '#1976d2' },
  { name: 'Deployment', color: '#fbc02d' },
  { name: 'Maintenance', color: '#8e24aa' },
  { name: 'Urgent', color: '#d32f2f' },
  { name: 'Critical', color: '#f57c00' },
]);

const boards = ref([
  {
    title: 'Ready',
    value: 'ready',
    tasks: [
      {
        id: faker.string.uuid(),
        title: 'Task 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://picsum.photos/id/1/280/210',
        status: 'ready',
        members: members.value.slice(0, 3),
        labels: labels.value.slice(0, 2),
        dueDate: '2023-07-20',
        comments: [
          {
            member: members.value[0],
            text: 'This is a comment on Task 1.',
            timestamp: '2023-07-15T10:00:00Z',
          },
          {
            member: members.value[1],
            text: 'Another comment on Task 1.',
            timestamp: '2023-07-16T12:00:00Z',
          },
        ],
        attachments: [
          {
            name: 'Attachment 1',
            url: 'https://picsum.photos/id/1/280/210',
            size: '55 KB',
            isCover: true,
          },
          {
            name: 'Attachment 2',
            url: 'https://picsum.photos/id/2/280/210',
            size: '45 KB',
            isCover: false,
          },
        ],
      }
    ]
  },
  { title: 'W.I.P', value: 'wip', tasks: [] },
  { title: 'In QA', value: 'in-qa', tasks: [] },
  { title: 'Done', value: 'done', tasks: [] },
]);

function onDragStart(event: DragEvent, task: any) {
  draggedTask.value = task;
  event.dataTransfer!.effectAllowed = 'move';
  event.dataTransfer!.setData('text/html', task.id);
}

function onDrop(event: DragEvent, targetBoardValue: string) {
  event.preventDefault();
  
  if (!draggedTask.value) return;
  
  const taskToMove = draggedTask.value;
  const sourceBoard = boards.value.find(board => 
    board.tasks.some(task => task.id === taskToMove.id)
  );
  
  if (sourceBoard) {
    const taskIndex = sourceBoard.tasks.findIndex(task => task.id === taskToMove.id);
    if (taskIndex > -1) {
      sourceBoard.tasks.splice(taskIndex, 1);
    }
  }
  
  const targetBoard = boards.value.find(board => board.value === targetBoardValue);
  if (targetBoard) {
    taskToMove.status = targetBoardValue;
    targetBoard.tasks.push(taskToMove);
  }
  
  draggedTask.value = null;
}

function addNewBoard() {
  if (!newBoardTitle.value.trim()) return;

  const newBoard = {
    title: newBoardTitle.value,
    value: faker.string.uuid(),
    tasks: [],
  };

  boards.value.push(newBoard);
  newBoardTitle.value = '';
  addBoardDialog.value = false;
}

function addTaskToBoard() {
  if (!newTaskTitle.value.trim()) return;

  const newTask = {
    id: faker.string.uuid(),
    title: newTaskTitle.value,
    description: '',
    image: '',
    status: currentBoard.value,
    members: [],
    labels: [],
    dueDate: '',
    comments: [],
    attachments: [],
  };

  const targetBoard = boards.value.find(board => board.value === currentBoard.value);
  if (targetBoard) {
    targetBoard.tasks.push(newTask);
  }

  newTaskTitle.value = '';
  addTaskdialog.value = false;
}

function addCommentToTask() {
  if (taskComment.value.trim() === '') return;

  const newComment = {
    member: currentTask.value.members[0],
    text: taskComment.value,
    timestamp: new Date().toISOString(),
  };

  currentTask.value.comments.push(newComment);
  taskComment.value = '';

  boards.value.forEach(board => {
    board.tasks.forEach(task => {
      if (task.id === currentTask.value.id) {
        task.comments = currentTask.value.comments;
      }
    });
  });
}


function toggleLabelInTask(label: any) {
  const existingLabelIndex = currentTask.value.labels.findIndex((l: any) => l.name === label.name);
  
  if (existingLabelIndex > -1) {
    currentTask.value.labels.splice(existingLabelIndex, 1);
  } else {
    currentTask.value.labels.push(label);
  }
  
  boards.value.forEach(board => {
    board.tasks.forEach(task => {
      if (task.id === currentTask.value.id) {
        task.labels = currentTask.value.labels;
      }
    });
  });
}

function addMemberToTask(member: any) {
  if (!currentTask.value.members.some((m: any) => m.id === member.id)) {
    currentTask.value.members.push(member);
  }
  boards.value.forEach(board => {
    board.tasks.forEach(task => {
      if (task.id === currentTask.value.id) {
        task.members = currentTask.value.members;
      }
    });
  });
}
</script>
<style scoped>
.task-label {
  width: 40px;
  height: 10px;
  border-radius: 4px;
}

.draggable-task {
  cursor: grab;
  transition: all 0.3s ease;
}

.draggable-task:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.draggable-task:active {
  cursor: grabbing;
}

.drop-zone {
  min-height: 100px;
  transition: background-color 0.3s ease;
}

.drop-zone:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>