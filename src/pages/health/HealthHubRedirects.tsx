import { Navigate, useParams } from 'react-router-dom';

/** Redirect /health-hub/unit/:unitId to Topics — Topics is the main lab page (Science Lab structure) */
export function HealthHubUnitToTopicsRedirect() {
  const { unitId } = useParams<{ unitId: string }>();
  if (!unitId) return null;
  return <Navigate to={`/health-hub/unit/${unitId}/topics`} replace />;
}
