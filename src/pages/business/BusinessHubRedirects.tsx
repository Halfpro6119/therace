import { Navigate, useParams } from 'react-router-dom';

/** Redirect /business-hub/unit/:unitId to Topics — Topics is the main lab page (Science Lab structure) */
export function BusinessHubUnitToTopicsRedirect() {
  const { unitId } = useParams<{ unitId: string }>();
  if (!unitId) return null;
  return <Navigate to={`/business-hub/unit/${unitId}/topics`} replace />;
}
