import { avatarIcon } from "@/shared/assets";
import type { User } from "../types/types";

export const USERS: User[] = [
  {
    id: "1",
    firstName: "Ирина",
    lastName: "Морозова",
    avatarUrl: avatarIcon,
    email: "irina_morozova@mail.ru",
    phone: "+7 (999) 999-99-99",
    position: "Менеджер",
  },
  {
    id: "2",
    firstName: "Антон",
    lastName: "Ковалев",
    email: "anton_kovalev@mail.ru",
    phone: "+7 (888) 888-88-88",
  },
];

export const ME_ID = 1;
export const BOT_ID = 0;
