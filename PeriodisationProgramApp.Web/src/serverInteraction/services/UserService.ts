import BaseServerInteractionService from "../BaseServerInteractionService";

const addThisUser = async () => {
  return BaseServerInteractionService.Get<boolean>("/User/AddThisUser");
};

const UserService = {
  addThisUser,
};

export default UserService;
