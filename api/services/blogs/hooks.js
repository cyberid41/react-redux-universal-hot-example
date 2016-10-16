import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';
import { validateHook as validate } from '../../hooks';
import { required } from '../../utils/validation';
const slugify = require('slugify');

const schemaValidator = {
  title: [required],
  body: [required]
};

const blogsHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      validate(schemaValidator),
      hook => {
        hook.data = {
          text: hook.data.title,
          body: hook.data.body,
          slug: slugify(hook.data.title),
        };
      },
      hook => {
        hook.data.createdAt = new Date();
      }
    ],
    update: [hooks.disable()],
    patch: [hooks.disable()],
    remove: [hooks.disable()]
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default blogsHooks;