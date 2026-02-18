export const getPhoneHref = (phone: string) =>
  `tel:+${phone.replace(/\\D/g, "")}`;
