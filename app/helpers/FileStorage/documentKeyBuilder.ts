export const documentKeyBuilder = ({
  tenantId,
  patientId,
  fileName,
}: {
  tenantId: string;
  patientId: string;
  fileName: string;
}) => {
  return `tenants/${tenantId}/patients/${patientId}/${fileName}`;
};
