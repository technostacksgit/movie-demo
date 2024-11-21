import User, { IUser } from '@/models/user';

/**
 * Fetch a user based on their email.
 * @param email - The email of the user to fetch.
 * @returns The user document or null if not found.
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ email }).lean<IUser>();
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Unable to fetch user. Please try again later.');
  }
};

/**
 * Fetch a user based on their email.
 * @param id - The id of the user to fetch.
 * @returns The user document or null if not found.
 */
export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(id).lean<IUser>();
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Unable to fetch user. Please try again later.');
  }
};

/**
 * Update a user's details.
 * @param email - The email of the user to update.
 * @param updates - The fields to update in the user document.
 * @returns The updated user document or null if not found.
 */
export const updateUser = async (
    email: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> => {
    try {
      const updatedUser = await User.findOneAndUpdate({ email }, updates, {
        new: true, // Return the updated document
        runValidators: true, // Ensure the updates conform to the schema
      }).lean<IUser>();
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Unable to update user. Please try again later.');
    }
  };

/**
 * Create a new user.
 * @param user - The user object to create.
 * @returns The created user document.
 */
export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Unable to create user. Please try again later.');
  }
}