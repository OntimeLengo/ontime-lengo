import { DataSchema } from '../../../src/common/DataSchema';

const UpdateUserDataSchema: DataSchema = new DataSchema({
  name: String,
  email: String,
  language: String,
  active: Boolean
});

export {
  UpdateUserDataSchema
};
