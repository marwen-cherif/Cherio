export const documentKeyBuilder = ({
  tenantId,
  patientDetailsId,
  fileName,
}: {
  tenantId: string;
  patientDetailsId: string;
  fileName: string;
}) => {
  return `tenants/${tenantId}/patients/${patientDetailsId}/${fileName}`;
};
