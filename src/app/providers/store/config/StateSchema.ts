import type { MessageSchema } from "@/entities/message";
import type { giphyApi } from "@/shared/api";

export interface StateSchema {
  message: MessageSchema;
  giphyApi: ReturnType<typeof giphyApi.reducer>;
}
