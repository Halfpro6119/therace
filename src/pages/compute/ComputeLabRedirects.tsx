import { Navigate, useParams } from 'react-router-dom';

/** Redirect /compute-lab/unit/:unitId to Topics — Topics is the main lab page (Science Lab structure) */
export function ComputeLabUnitToTopicsRedirect() {
  const { unitId } = useParams<{ unitId: string }>();
  if (!unitId) return null;
  return <Navigate to={`/compute-lab/unit/${unitId}/topics`} replace />;
}
