import RefundedEntity from "../../schema/finance/RefundedSchema";

export default async function IsRefundCreated(bookingId) {
  const existingRefund = await RefundedEntity.findOne({
    bookingId: bookingId,
    isRefunded: true,
  });

  return existingRefund != null ? true : false;
}
