import { ref } from 'vue';
import MesaService from '../../../services/dashboard/MesaServiceDashboard';

export const useMesaActive = (mesas = []) => {
    const ids = mesas.map(item => item.id);
    const status = mesas.every(item => item.is_active === mesas[0].is_active) ? mesas[0].is_active : 0;
    let res_status = [];
    for (let i = 0; i < ids.length; i++) {
        const payload = {
            id: ids[i],
            is_active: !Boolean(status)
        };
        MesaService.UpdateOneMesa(payload)
            .then(res => res_status.push(res.status))
            .catch(error => console.error(error))
    }
    if (res_status.every(item => item === 200)) {
        let mesas_ = [];
        for (let i = 0; i < mesas.length; i++) {
            let new_mesa = mesas[i];
            new_mesa.is_active = Number(!Boolean(status));
            mesas_.push(new_mesa);
        }
        // return ref(mesas_);
    }
    return null;
};