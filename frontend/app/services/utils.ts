import * as Device from "expo-device";
import { v4 as uuidv4 } from "uuid";

export async function getUserId() {
  const deviceId = Device.osBuildId || Device.modelId || uuidv4();
  return `user-${deviceId}`;
}
