import BaseServerInteractionService from "../BaseServerInteractionService";

const login = async () => {
  return BaseServerInteractionService.Get<boolean>("/User/Login");
};

const UserService = {
  login,
};

export default UserService;
