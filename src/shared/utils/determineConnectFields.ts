type Field = {
  currentFieldIds: number[];
  newFieldIds: number[];
};

/**
 * Determine connect fields and disconnect fields of foreign field in prisma.
 * Need to have disconnect fields to remove removed items.
 * @returns
 */
export function determineConnectField({ currentFieldIds, newFieldIds }: Field) {
  // Determine the artist IDs to connect (new ones) and disconnect (removed ones)
  const fieldToConnect = newFieldIds.filter(
    (id) => !currentFieldIds.includes(id),
  );
  const fieldToDisconnect = currentFieldIds.filter(
    (id) => !newFieldIds.includes(id),
  );
  return {
    fieldToConnect: fieldToConnect.map((id) => ({ id })),
    fieldToDisconnect: fieldToDisconnect.map((id) => ({ id })),
  };
}
