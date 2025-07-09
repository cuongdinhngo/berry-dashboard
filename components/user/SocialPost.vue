<template>
  <v-card
    class="mt-4 py-4 rounded-lg elevation-0"
  >
    <v-list-item
      :prepend-avatar="post.avatar"
    >
      <template #title>
        <span class="text-subtitle-2 font-weight-bold">{{ post.user }}</span>
        <span class="text-caption text-medium-emphasis ml-4">{{ post.time }}</span>
      </template>
      <template #append>
        <v-btn
          icon="mdi-dots-horizontal"
          variant="text"
          :id="`post-options-${post.id}`"
          size="small"
        ></v-btn>
        <v-menu :activator="`#post-options-${post.id}`">
          <v-list>
            <v-list-item title="Edit"></v-list-item>
            <v-list-item title="Delete"></v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-list-item>
    <v-card-text class="text-subtitle-2">
      {{ post.content }}
    </v-card-text>
    <v-card-title class="d-flex justify-space-between align-center">
      <div>
        <v-btn
          variant="text"
          prepend-icon="mdi-thumb-up"
          :color="isLiked ? 'primary' : 'on-surface'"
          @click="toggleLike"
        >
          <span class="text-caption font-weight-bold">{{ post.like }} Like</span>
        </v-btn>

        <v-btn
          variant="text"
          prepend-icon="mdi-comment"
          color="secondary"
        >
          <span class="text-caption font-weight-bold">{{ post.comments.length }} Comment</span>
        </v-btn>
      </div>

      <v-btn
        variant="text"
        icon="mdi-share-variant-outline"
        color="secondary"
        size="small"
        :id="`share-post-${post.id}`"
      ></v-btn>
      <v-menu :activator="`#share-post-${post.id}`">
        <v-list slim density="compact" nav>
          <v-list-item title="Share to Facebook" prepend-icon="mdi-alpha-f-circle-outline"></v-list-item>
          <v-list-item title="Share to Twitter" prepend-icon="mdi-bird"></v-list-item>
          <v-list-item title="Share to LinkedIn" prepend-icon="mdi-linkedin"></v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-card-text>
      <v-row no-gutters>
        <v-col
          v-if="smAndUp"
          sm="1" md="1" lg="1" class="d-flex align-center justify-center">
          <v-avatar>
            <v-img :src="post.avatar" alt="User Avatar"/>
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="9" :class="[smAndUp ? 'px-2' : 'mb-2']">
          <v-text-field
            v-model="comment"
            label="Add a comment..."
            variant="outlined"
            color="blue"
            outlined
            clearable
            hide-details
            rounded="xl"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" md="2" lg="2" class="d-flex align-center">
          <v-btn
            variant="flat"
            color="secondary"
            text="Comment"
            size="large"
            @click="sendComment"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <!--Post Comments-->
    <v-card-text
      v-if="post.comments.length"
      class="py-0"
    >
      <div
        v-for="comment in post.comments"
        :key="comment.id"
        class="comment-container"
      >
        <!-- Comment Card -->
        <v-card
          class="my-2 py-2 elevation-0 rounded-lg bg-container-bg"
        >
          <v-list-item
            :prepend-avatar="comment.avatar"
          >
            <template #title>
              <span class="text-subtitle-2 font-weight-bold">{{ comment.user }}</span>
              <span class="text-caption text-medium-emphasis ml-4">{{ comment.time }}</span>
            </template>
            <template #append>
              <v-btn
                icon="mdi-dots-horizontal"
                variant="text"
                :id="`comment-options-${comment.id}`"
                size="small"
              ></v-btn>
              <v-menu :activator="`#comment-options-${comment.id}`">
                <v-list>
                  <v-list-item title="Edit"></v-list-item>
                  <v-list-item title="Delete"></v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-list-item>
          <v-card-text class="text-subtitle-2 py-2">
            {{ comment.text }}
          </v-card-text>
          <v-card-title class="d-flex justify-space-between align-center py-0">
            <div>
              <v-btn
                variant="text"
                prepend-icon="mdi-thumb-up"
                :color="comment.like > 0 ? 'primary' : 'on-surface'"
                @click="toggleLikeComment(comment)"
              >
                <span class="text-caption font-weight-bold">{{ comment.like }} Like</span>
              </v-btn>

              <v-btn
                variant="text"
                prepend-icon="mdi-reply"
                color="secondary"
                text="Reply"
                @click="toggleReplyInput(comment.id)"
              >
              </v-btn>
            </div>
          </v-card-title>
        </v-card>

        <!-- Replies Section -->
        <div v-if="comment.replies && comment.replies.length" class="pl-8">
          <v-card
            v-for="reply in comment.replies"
            :key="reply.id"
            class="my-2 py-2 elevation-0 rounded-lg bg-container-bg"
          >
            <v-list-item
              :prepend-avatar="reply.avatar"
            >
              <template #title>
                <span class="text-subtitle-2 font-weight-bold">{{ reply.user }}</span>
                <span class="text-caption text-medium-emphasis ml-4">{{ reply.time }}</span>
              </template>
            </v-list-item>
            <v-card-text class="text-subtitle-2 py-2">
              {{ reply.text }}
            </v-card-text>
          </v-card>
        </div>

        <!-- Reply Input - Shows directly below the specific comment -->
        <v-card
          v-if="showReplyInput[comment.id]"
          class="mb-2 elevation-0 rounded-lg bg-background"
        >
          <v-card-text class="py-2">
            <v-row no-gutters>
              <v-col
                v-if="smAndUp"
                sm="1" md="1" lg="1" class="d-flex align-center justify-center"
              >
                <v-avatar size="32">
                  <v-img :src="post.avatar" alt="User Avatar"/>
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="9" md="9" lg="9" :class="smAndUp ? 'px-2' : 'mb-2'">
                <v-text-field
                  v-model="commentReply"
                  label="Write a reply"
                  variant="outlined"
                  color="blue"
                  outlined
                  clearable
                  hide-details
                  rounded="xl"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2" lg="2" class="d-flex align-center">
                <v-btn
                  variant="flat"
                  color="secondary"
                  text="Reply"
                  size="small"
                  @click="sendReply(comment.id)"
                ></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>

    </v-card-text>

  </v-card>
</template>
<script setup lang="ts">
import { faker } from '@faker-js/faker';

interface Reply {
  id: string | number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  like: number;
}

interface Comment {
  id: string | number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  like: number;
  replies?: Reply[];
}

interface Post {
  id: number;
  avatar: string;
  user: string;
  time: string;
  content: string;
  like: number;
  comments: Comment[];
}

const post = defineModel('post', {
  type: Object as () => Post,
  required: true,
});

const { mdAndDown, smAndUp } = useDisplay();
const isLiked = ref(false);
const isLikedComment = ref(false);
const comment = ref('');
const commentReply = ref('');
const showReplyInput = ref<Record<string, boolean>>({});

function toggleLike() {
  post.value.like = isLiked.value ? post.value.like - 1 : post.value.like + 1;
  isLiked.value = !isLiked.value;
}

function toggleLikeComment(comment: Comment) {
  comment.like = comment.like ? comment.like + (isLikedComment.value ? -1 : 1) : 1;
  isLikedComment.value = !isLikedComment.value;
}

function sendComment() {
  if (comment.value.trim() === '') return;

  const newComment: Comment = {
    id: faker.string.uuid(),
    user: post.value.user,
    avatar: post.value.avatar,
    like: 0,
    text: comment.value,
    time: new Date().toLocaleTimeString(),
  };

  post.value.comments.push(newComment);
  comment.value = '';
}

function toggleReplyInput(commentId: string) {
  console.log('Reply Input => ', showReplyInput.value);
  // Close all other reply inputs first
  Object.keys(showReplyInput.value).forEach(key => {
    if (key !== commentId) {
      showReplyInput.value[key] = false;
    }
  });
  
  // Toggle the clicked comment's reply input
  showReplyInput.value[commentId] = !showReplyInput.value[commentId];
  
  // Clear the reply text when opening a new reply input
  if (showReplyInput.value[commentId]) {
    commentReply.value = '';
  }
}

function sendReply(commentId: string) {
  if (commentReply.value.trim() === '') return;

  // Find the comment to reply to
  const commentIndex = post.value.comments.findIndex(c => c.id === commentId);
  if (commentIndex !== -1) {
    // For now, we'll add the reply as a new comment with a reference
    const newReply: Reply = {
      id: faker.string.uuid(),
      user: post.value.user,
      avatar: post.value.avatar,
      like: 0,
      text: commentReply.value,
      time: new Date().toLocaleTimeString(),
    };

    post.value.comments[commentIndex].replies?.push(newReply);
    commentReply.value = '';
    showReplyInput.value[commentId] = false;
  }

  console.log('POSTs => ', post.value);
}

watch(() => post.value.comments, (newComments) => {
  // Ensure replies are initialized
  newComments.forEach(comment => {
    if (!comment.replies) {
      comment.replies = [];
    }
  });
}, { deep: true });
</script>