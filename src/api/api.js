import axios from 'axios';
import _ from 'lodash';
import * as types from './types';
import config from '../config';

window.axios = axios;

/* eslint-disable */
function generateQuery(params) {
  if (params === undefined) {
    return '';
  }
  const esc = encodeURIComponent;
  const result = [];
  Object.keys(params)
    .forEach((k) => {
      if (params[k]) {
        result.push(esc(k) + '=' + esc(params[k]));
      }
    });
  return result.join('&');
}

export const signup = (body) => axios({
  method: 'post',
  url: `${config.apiHost}/user`,
  params: {
    ...body,
    admin: true,
  },
});

export const signin = ({user, password}) => axios({
    method: 'get',
    url: `${config.apiHost}/user/authentication`,
    headers: { 'Girder-Authorization': `Basic ${btoa(user + ":" + password)}` }
  }).then((resp) => {
    // axios.defaults.headers.common['Girder-Token'] = resp.data.authToken.token;
    return resp;
  });

export const getUserDataFolder = (userId, token) => axios({
  method: 'get',
  url: `${config.apiHost}/folder?parentType=user&parentId=${userId}&name=Responses`,
  headers: { 'Girder-Token': `${token}` },
})

export const getUserActivitySetFolders = (userFolderId, token) => axios({
  method: 'get',
  url: `${config.apiHost}/folder?parentType=folder&parentId=${userFolderId}`,
  headers: { 'Girder-Token': `${token}` },
})

export const getUserActivitySetData = (userActivitySetFolder, token) => axios({
  method: 'get',
  url: `${config.apiHost}/item?folderId=${userActivitySetFolder}&limit=5000`,
  headers: { 'Girder-Token': `${token}` },
});

export const changeProfile = (id, body) => ({
  type: types.CHANGE_PROFILE,
  method: 'PUT',
  path: `/user/${id}`,
  body,
});

export const changePassword = (id, body) => ({
  type: types.CHANGE_PASSWORD,
  method: 'PUT',
  path: `/user/${id}/password`,
  body,
});

export const forgotPassword = (body) => axios({
  method: 'PUT',
  url: `${config.apiHost}/user/password/temporary`,
  params: body,
});

export const resetPassword = (body) => ({
  type: types.RESET_PASSWORD,
  method: 'POST',
  path: '/user/reset-password',
  body,
});

export const signout = (body) => ({
  type: types.SIGN_OUT,
})

export const inviteUser = (body, meta) => ({
  type: types.POST_USER,
  method: 'POST',
  path: '/user',
  body: {
    ...body,
    metadata:JSON.stringify(meta),
    admin: true,
  },
})

export const setUserTemporary = (email) => ({
  type: types.PUT_USER,
  method: 'PUT',
  path: '/user/password/temporary',
  body: { email }
})

/* ----- Acts ----- */

export const getAllActivitySets = (token) => axios({
  method: 'GET',
  url: `${config.apiHost}/collection/?text=Volumes`,
}).then((resp) => {
  return resp.data[0]._id;
}).then((parentId) => getActivitySets(parentId, token));

export const getActivitySets = (parentId, token) => axios({
  method: 'GET',
  url: `${config.apiHost}/folder?parentId=${parentId}&parentType=collection`,
  headers: {
    // 'Cache-Control': 'no-cache',
    'Girder-Token': `${token}`,
  },
})

export const fullImageURL = (fileId) => `${config.apiHost}/${fileId}/download?contentDisposition=inline`;

/**
 * gets a specific activity set by its id
 * @param {String} activityId 
 */
export const getActivitySet = (activityId, token) => axios({
  method: 'GET',
  url: `${config.apiHost}/folder/${activityId}`,
  headers: {
    'Girder-Token': `${token}`,
  },
});

/**
 * 
 * @param {String} activity_id 
 * once you get the id of the Activies folder for the particular Activity Set
 */
const getContentsOfActivitiesFolder = (activity_id, token) => axios({
  method: 'GET',
  url: `${config.apiHost}/folder?parentId=${activity_id}&parentType=folder`,
  headers: {
    'Girder-Token': `${token}`,
  },
});

export const initializeActivity = ({ name, id, token }) => {
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('parentId', id);
  bodyFormData.set('parentType', 'folder');
  bodyFormData.set('reuseExisting', true);
  bodyFormData.set('metadata', JSON.stringify({}));
  return axios({
    method: 'POST',
    url: `${config.apiHost}/folder`,
    data: bodyFormData,
    headers: {
      'Girder-Token': `${token}`,
    },
  }).then((resp) => {
    console.log('response from initialize', resp.data);
    return resp;
  });
}

export const getActivityMetadata = (activityId, token) => axios({
  method: 'GET',
  url: `${config.apiHost}/folder?parentId=${activityId}&parentType=folder`,
  headers: {
    'Girder-Token': `${token}`,
  },
});

export const getActivitiesInActivitySet = (parentId, token) => axios({
  method: 'GET',
  url: `${config.apiHost}/folder?parentId=${parentId}&parentType=folder`,
  headers: {
    'Girder-Token': `${token}`,
  },
}).then((resp) => {
  // get the id of the folder named Activities
  const filtered = _.filter(resp.data, d => d.name === 'Activities');
  console.log('activities?', filtered);
  if (filtered.length) {
    return _.filter(resp.data, d => d.name === 'Activities')[0]._id;
  }
}).then((id) => id ? getContentsOfActivitiesFolder(id, token) : { data: [] });

export const getScreenMetadata = (activityId, token) => axios({
  method: 'GET',
  url: `${config.apiHost}/item?folderId=${activityId}`,
  headers: {
    'Girder-Token': `${token}`,
  },
});

export const createNewActivitySet = (userId, token) => axios({
  method: 'GET',
  url: `${config.apiHost}/collection/?text=Volumes`
}).then((resp) => {
  console.log('got id', resp.data[0]._id);
  return resp.data[0]._id;
}).then((parentId) => axios({
  method: 'POST',
  url: `${config.apiHost}/folder`,
  params: {
    name: 'Untitled Activity Set',
    metadata: {
      shortName: 'untitled',
      description: 'an untitled activity set',
      members: {
        editors: [userId],
        managers: [userId],
        users: [],
        viewers: [],
      },
    },
    parentId,
    parentType: 'collection',
    reuseExisting: true,
  },
  headers: { 'Girder-Token': `${token}` },
}));

export const updateActivitySetMetadata = ({name, metadata, parentId, token}) => axios({
  method: 'PUT',
  url: `${config.apiHost}/folder/${parentId}`,
  headers: { 'Girder-Token': `${token}` },
  params: {
    name,
    metadata,
  },
});

export const updateActivityMetadata = ({name, metadata, parentId, token}) => {
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('metadata', JSON.stringify(metadata));

  return axios({
    method: 'PUT',
    url: `${config.apiHost}/folder/${parentId}`,
    headers: { 'Girder-Token': `${token}` },
    data: bodyFormData,
  });
};



export const createNewActivity = ({name, parentId, token}) => axios({
  method: 'GET',
  url: `${config.apiHost}/folder?parentId=${parentId}&parentType=folder`,
  headers: {
    'Girder-Token': `${token}`,
  },
}).then((resp) => {
  // get the id of the folder named Activities
  const filtered = _.filter(resp.data, d => d.name === 'Activities')
  if (filtered.length) {
    return filtered[0]._id;
  } else {
    console.log('creating the folder')
    const bodyFormData = new FormData();
    bodyFormData.set('name', 'Activities');
    bodyFormData.set('parentId', parentId);
    bodyFormData.set('parentType', 'folder');
    bodyFormData.set('reuseExisting', true);
    bodyFormData.set('metadata', JSON.stringify({}));
    return axios({
      method: 'POST',
      url: `${config.apiHost}/folder`,
      headers: {
        'Girder-Token': `${token}`,
      },
      data: bodyFormData,
    }).then((resp) => resp.data._id);
  }
}).then((activityFolderId) => {
  console.log('activities folder id is', activityFolderId);
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('parentId', activityFolderId);
  bodyFormData.set('parentType', 'folder');
  bodyFormData.set('reuseExisting', true);
  bodyFormData.set('metadata', JSON.stringify({}));
  return axios({
    method: 'POST',
    url: `${config.apiHost}/folder/`,
    headers: { 'Girder-Token': `${token}` },
    data: bodyFormData,
  })
});

export const deleteActivity = ({activityId, token}) => axios({
  method: 'DELETE',
  url: `${config.apiHost}/folder/${activityId}`,
  headers: {
    'Girder-Token': `${token}`,
  },
});

export const addScreen = ({name, folderId, token}) => {
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('folderId', folderId);
  bodyFormData.set('metadata', JSON.stringify({skippable: true}));
  return axios({
    method: 'POST',
    url: `${config.apiHost}/item`,
    headers: {
      'Girder-Token': `${token}`,
    },
    data: bodyFormData,
  });
}

export const updateScreen = ({ name, metadata, screenPath, token }) => {
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('metadata', JSON.stringify(metadata));
  return axios({
    method: 'PUT',
    url: `${config.apiHost}/${screenPath}`,
    headers: {
      'Girder-Token': `${token}`,
    },
    data: bodyFormData,
  });
};

export const deleteScreen = ({ itemId, token }) => axios({
  method: 'DELETE',
  url: `${config.apiHost}/${itemId}`,
  headers: {
    'Girder-Token': `${token}`,
  },
});

/**
 * get a user's metadata
 * @param {String} userId 
 */
export const getUserMetadata = (userId) => axios({
  method: 'GET',
  url: `${config.apiHost}/user/${userId}`,
})

export const getAssignedActs = (userId) => ({
  type: types.GET_LIST,
  method: 'GET',
  path: `/users/${userId}/assigned_acts`
})

export const searchActs = (keyword, offset, limit ) => ({
  type: types.GET_LIST,
  method: 'GET',
  path: `/acts/search?keyword=${keyword}&offset=${offset}&limit=${limit}`
})

export const assignAct = (userId, actId) => ({
  type: types.GET_LIST,
  method: 'PUT',
  path: `/users/${userId}/assign/${actId}`
})

export const cancelAct = (userId, actId) => ({
  type: types.PUT_ACTION,
  method: 'PUT',
  path: `/users/${userId}/assign/${actId}?is_delete=true`
})

export const addAct = (body) => ({
  type: types.ADD_ACT,
  method: 'POST',
  path: '/acts',
  isMultipartUpload: true,
  body,
})

export const updateAct = ({id, ...body}) => ({
  type: types.UPDATE_ACT,
  method: 'PUT',
  path: `/acts/${id}`,
  body
})

export const deleteAct = (act) => ({
  type: types.DELETE_ACT,
  method: 'DELETE',
  path: `/acts/${act.id}`
})

/*------ answers ----- */

export const getAnswers = (userId, offset, limit, start_date, end_date) => ({
  type: types.GET_LIST,
  method: 'GET',
  path: `/users/${userId}/answers?${generateQuery({offset, limit, start_date, end_date})}`
})

export const getAnsweredActs = (userId) => ({
  type: types.GET_LIST,
  method: 'GET',
  path: `/users/${userId}/answered_acts`
})

export const saveAnswer = (actId, actData, answerData) => ({
  type: types.SAVE_ANSWER,
  method: 'POST',
  path: '/answers',
  body: {
      act_id:actId,
      act_data:actData,
      answer_data:answerData,
      platform: 'web'
  }
})

/*------- organizations ------*/

export const getOrganizations = (offset, limit) => ({
  type: types.GET_LIST,
  method: 'GET',
  path: `/group?${generateQuery({offset, limit})}`
})

export const addOrganization = (body) => ({
  type: types.ADD_ORGANIZATION,
  method: 'POST',
  path: '/group',
  body,
})

/*------- files ------- */

export const getFiles = (path) => ({
  type: types.GET_LIST,
  method: 'GET',
  path: `/files?${generateQuery({path})}`
})

export const postFile = (body) => ({
  type: types.POST_FILE,
  method: 'POST',
  path: `/files`,
  isMultipartUpload: true,
  body,
})

export const deleteFile = (path) => ({
  type: types.DELETE_FILE,
  method: 'DELETE',
  path: `/files?${generateQuery({path})}`,
});


export const listObjects = (parentId, parentType, name, objectType) => ({
  type: types.LIST_OBJECTS,
  method: 'GET',
  objectType,
  name,
  path: `/${objectType}?${generateQuery({parentId, parentType})}`,
});

export const getObject = (objectPath) => ({
  type: types.GET_OBJECT,
  method: 'GET',
  objectPath,
  path: `/${objectPath}`,
});

export const addObject = (type, name, meta, options) => ({
  type: types.ADD_OBJECT,
  method: 'POST',
  path: `/${type}`,
  objectType: type,
  body: {
    name,
    metadata:JSON.stringify(meta),
    ...options,
  },
});

export const updateObject = (type, id, name, meta, options={}) => ({
  type: types.UPDATE_OBJECT,
  method: 'PUT',
  objectType: type,
  path: `/${type}/${id}`,
  body: {
    ...options,
    name,
    metadata:JSON.stringify(meta),
  },
});

export const deleteObject = (id, type) => ({
  type: types.DELETE_OBJECT,
  method: 'DELETE',
  path: `/${type}/${id}`
})

export const addItem = (name, meta, folderId) => (addObject('item', name, meta, {folderId}));
export const updateItem = (id, name, meta) => (updateObject('item', id, name, meta));

// Volumes
export const getCollection = (name) => ({
  type: types.GET_COLLECTION,
  method: 'GET',
  name,
  path: `/collection?text=${name}`,
});

export const getFolders = (parentId, name, parentType='collection') => ({
  type: types.LIST_OBJECTS,
  method: 'GET',
  objectType: 'folder',
  name,
  path: `/folder?${generateQuery({parentId, parentType})}`,
});

export const addFolder = (name, meta, parentId, parentType, reuseExisting = true) => ({
  type: types.ADD_OBJECT,
  method: 'POST',
  path: '/folder',
  objectType: 'folder',
  body: {
    name,
    metadata:JSON.stringify(meta),
    parentId,
    parentType,
    reuseExisting,
  },
});

export const updateFolder = (id, name, meta) => ({
  type: types.UPDATE_OBJECT,
  method: 'PUT',
  objectType: 'folder',
  path: `/folder/${id}`,
  body: {
    name,
    metadata:JSON.stringify(meta),
  },
});

export const updateFolderMeta = (id, meta) => ({
  type: types.UPDATE_OBJECT,
  method: 'PUT',
  objectType: 'folder',
  path: `/folder/${id}`,
  body: {
    metadata:JSON.stringify(meta),
  },
});

export const uploadFile = (name, fileObject, parentType, parentId) => ({
  type: types.ADD_OBJECT,
  method: 'POST',
  path: `/file?${generateQuery({
    parentId,
    parentType,
    name,
    size:fileObject.size,
    mimeType: fileObject.type,
  })}`,
  isUpload: true, 
  body: fileObject,
  extraHeaders: { 'Content-Type': fileObject.type }
})

export const getItems = (parentId) => ({
  type: types.GET_NAMES_HASH,
  method: 'GET',
  objectType: 'item',
  parentId,
  parentType: 'folder',
  path: `/item?${generateQuery({folderId:parentId})}`,
});

export const getFoldersDict = (objectType, parentId, parentType='folder') => ({
  type: types.GET_NAMES_HASH,
  method: 'GET',
  objectType,
  parentId,
  parentType: 'folder',
  path: `/${objectType}?${generateQuery({parentId, parentType})}`,
});

export const getUsers = (params) => ({
  type: types.GET_OBJECTS_HASH,
  method: 'GET',
  group: 'users',
  path: `/user?${generateQuery(params)}`,
})

export const getObjectsById = (name, group, params={}) => ({
  type: types.GET_OBJECTS_HASH,
  method: 'GET',
  group,
  path: `/${name}?${generateQuery(params)}`,
})

export const copyObject = (objectId, objectType, parentId, parentType) => ({
  type: types.ADD_OBJECT,
  method: 'POST',
  path: `/${objectType}/${objectId}/copy?${generateQuery({parentId, parentType})}`,
  body: {
    reuseExisting: true,
  }
})

export const getPath = (path, query) => ({
  type: types.GET_PATH,
  method: 'GET',
  path: `/${path}?${generateQuery(query)}`,
})