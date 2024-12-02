/*import React from 'react';

export default function Dashboard() {
  return (
    <Route path="/bate-papo" element={<BatePapo />} />
  );
}*/

import React from 'react';
import BatePapo from './BatePapo';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user); // Obtém o usuário do Redux

    if (!user) {
        return <p>Carregando usuário...</p>;
    }

    return (
        <div>
            <h1>Bem-vindo, {user.nickname}</h1>
            <BatePapo user={user} />
        </div>
    );
};

export default Dashboard;

