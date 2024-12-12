import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { getToken } from "../../api/session";
import { DialogContext } from "../../providers/ModalContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import SelectComponent from "../Select";
import { userRolesToDisplay } from "../../constants";

export default function Login() {
  const {
    username,
    setUsername,
    setAuthToken,
    role: contextRole,
    setRole,
  } = useContext(UserSettingsContext);
  const role = contextRole || "STUDENT";
  const { closeDialog } = useContext(DialogContext);
  const [_username, _setUsername] = useState(username);
  const [email, setEmail] = useState("");

  const handleLocalModalSave = async (e) => {
    if (_username !== username) {
      setUsername(_username);
    }
    if (_username && email) {
      let { result } = await getToken({
        username: _username,
        sub: _username,
        role: role ?? "STUDENT",
        givenName: "Student",
        surname: "Student",
        email: email,
      });

      const { token } = result;
      await setAuthToken(token);
    }
    window.location.reload();
    closeDialog();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid w-full gap-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          onChange={(e) => {
            _setUsername(e.target.value);
          }}
          defaultValue={_username}
          placeholder={"User Name"}
        />
      </div>

      <div className="grid w-full gap-y-2">
        <Label htmlFor="Email">Email</Label>
        <Input
          id="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          defaultValue={email}
          placeholder={"Email Address"}
        />
      </div>
      <div className="grid w-full gap-y-2">
        <SelectComponent
          id="Role"
          onChange={(value) => setRole(value)}
          defaultValue={role}
          name={"Role"}
          value={role}
          items={userRolesToDisplay}
        />
      </div>

      <Button
        type="primary"
        variant="default"
        fullWidth={true}
        onClick={handleLocalModalSave}
      >
        Save
      </Button>
    </div>
  );
}
