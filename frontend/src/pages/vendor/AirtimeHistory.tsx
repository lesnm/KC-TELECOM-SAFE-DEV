import { useEffect, useState } from 'react';
import { airtimeApi, ApiError } from '../../lib/api';
import { formatDate, formatNaira, formatNetwork } from '../../lib/format';
import { Banner, Card, EmptyState, Spinner } from '../../components/ui';
import type { AirtimePurchase } from '../../types';

export default function AirtimeHistory() {
  const [purchases, setPurchases] = useState<AirtimePurchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    airtimeApi
      .myPurchases()
      .then(setPurchases)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Failed to load airtime history'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Airtime History</h1>
      {error && <Banner kind="error" message={error} />}

      <Card>
        {purchases.length === 0 ? (
          <EmptyState message="You haven't purchased any airtime yet." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Network</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Reference</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 pr-4 text-slate-600">{formatDate(purchase.createdAt)}</td>
                    <td className="py-2 pr-4 text-slate-600">{formatNetwork(purchase.network)}</td>
                    <td className="py-2 pr-4 text-slate-600">{purchase.phone}</td>
                    <td className="py-2 pr-4 font-medium text-slate-900">{formatNaira(purchase.amount)}</td>
                    <td className="py-2 pr-4 text-slate-600">{purchase.status}</td>
                    <td className="py-2 pr-4 font-mono text-xs text-slate-400">{purchase.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}