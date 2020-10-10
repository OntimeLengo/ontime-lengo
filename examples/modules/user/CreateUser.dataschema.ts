import { DataSchema } from '../../../src/common/DataSchema';

const CreateUserDataSchema: DataSchema = new DataSchema({
  name: String,
  email: String,
  language: String,
  active: Boolean
});

export {
  CreateUserDataSchema
};
