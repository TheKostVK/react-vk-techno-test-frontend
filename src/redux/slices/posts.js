import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import instance from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
        const {data} = await axios.get('/posts');
        return data;
    }
);

export const fetchPostsOnPage = createAsyncThunk(
    'posts/fetchPostsOnPage',
    async ({ page, perPage }) => {
        const { data } = await axios.get(`/posts/p?page=${page}&perPage=${perPage}`);
        return data;
    }
);

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/posts/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    await axios.delete(`/posts/${id}`);
});

// Функция получения новых постов с сервера на основе сравнения id последних постов клиента и сервера
export const fetchNewPosts = createAsyncThunk(
    "posts/fetchNewPosts",
    async (lastPostId) => {
        const response = await instance.get(`/api/posts?lastPostId=${lastPostId}`);
        const newPosts = response.data;
        return newPosts.length ? newPosts : null;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {
            items: [], // начальное значение для списка постов
            pageInfo: [],
            status: 'loading',
            error: null,
        },
        postsOnPage: {
            items: [], // начальное значение для списка постов
            pageInfo: [],
            status: 'loading',
            error: null,
        },
        tags: {
            items: [],
            status: 'loading',
        },
    },
    reducers: {},
    extraReducers: {
        // posts
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // postsOnPage
        [fetchPostsOnPage.pending]: (state) => {
            state.postsOnPage.items = [];
            state.postsOnPage.status = 'loading';
        },
        [fetchPostsOnPage.fulfilled]: (state, action) => {
            state.postsOnPage.items = action.payload.postsOnPage;
            state.postsOnPage.pageInfo = action.payload.pageInfo;
            state.postsOnPage.status = 'loaded';
        },
        [fetchPostsOnPage.rejected]: (state) => {
            state.postsOnPage.items = [];
            state.postsOnPage.status = 'error';
        },

        // tags
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        // remove
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        },
        [fetchRemovePost.rejected]: (state) => {
            state.posts.status = 'error';
        }
    }
});

export const postsReducer = postsSlice.reducer;