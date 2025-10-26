import { insertOrganization, updateOrganization } from "@/features/organizations/db/organizations";
import { insertUserNotificationSettings } from "@/features/users/db/userNotificationSettings";
import { deleteUser, insertUser, updateUser } from "@/features/users/db/users";
import { UserJSON, DeletedObjectJSON, OrganizationJSON } from "@clerk/nextjs/server";

export type Event =
  | { type: "user.created"; data: UserJSON }
  | { type: "user.deleted"; data: DeletedObjectJSON }
  | { type: "user.updated"; data: UserJSON }
  | { type: "organization.created"; data: OrganizationJSON }
  | { type: "organization.deleted"; data: DeletedObjectJSON }
  | { type: "organization.updated"; data: OrganizationJSON };

export const clerkCreateUser = async (data: UserJSON) => {
  const email = data.email_addresses[0].email_address;

  await insertUser({
    email: email,
    name: `${data.first_name} ${data.last_name}`,
    imageUrl: data.image_url,
    id: data.id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  });

  await insertUserNotificationSettings({ userId: data.id });

  return data.id;
};

export const clerkDeleteUser = async (data: DeletedObjectJSON) => {
  if (!data.id) {
    return;
  }
  await deleteUser(data.id);

  return data.id;
};

export const clerkUpdatedUser = async (data: UserJSON) => {
  const email = data.email_addresses[0].email_address;

  await updateUser(data.id, {
    email: email,
    name: `${data.first_name} ${data.last_name}`,
    imageUrl: data.image_url,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  });
  return data.id;
};

export const clerkCreateOrganization = async (data: OrganizationJSON) => {
  await insertOrganization({
    name: data.name,
    imageUrl: data.image_url,
    id: data.id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  });
};

export const clerkDeleteOrganization = async (data: DeletedObjectJSON) => {
  if (!data.id) {
    return;
  }
  await deleteUser(data.id);

  return data.id;
};

export const clerkUpdatedOrganization = async (data: OrganizationJSON) => {
  await updateOrganization(data.id, {
    name: data.name,
    imageUrl: data.image_url,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  });
  return data.id;
};
