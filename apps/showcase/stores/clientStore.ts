import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DeliveryAddress, PickupPoint } from '@shared/index';

export type DeliveryType = 'home' | 'pickup' | null;

interface ClientState {
  // Delivery information
  deliveryAddress: DeliveryAddress | undefined;
  pickupPoint: PickupPoint | undefined;
  deliveryType: DeliveryType;
  
  // Actions
  setDeliveryAddress: (address: DeliveryAddress) => void;
  setPickupPoint: (point: PickupPoint) => void;
  setDeliveryType: (type: DeliveryType) => void;
  clearDeliveryInfo: () => void;
  clearAll: () => void;
}

const initialState = {
  deliveryAddress: undefined,
  pickupPoint: undefined,
  deliveryType: null as DeliveryType,
};

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setDeliveryAddress: (address) => {
        set({ 
          deliveryAddress: address,
          deliveryType: 'home',
          // Clear pickup point when setting home delivery
          pickupPoint: undefined,
        });
      },
      
      setPickupPoint: (point) => {
        set({ 
          pickupPoint: point,
          deliveryType: 'pickup',
          // Clear delivery address when setting pickup point
          deliveryAddress: undefined,
        });
      },
      
      setDeliveryType: (type) => {
        set({ deliveryType: type });
      },
      
      clearDeliveryInfo: () => {
        set({
          deliveryAddress: undefined,
          pickupPoint: undefined,
          deliveryType: null,
        });
      },
      
      clearAll: () => {
        set(initialState);
      },
    }),
    {
      name: 'client-store', // localStorage key
      // Only persist delivery information, not UI state like deliveryType selection
      partialize: (state) => ({
        deliveryAddress: state.deliveryAddress,
        pickupPoint: state.pickupPoint,
      }),
    }
  )
);

