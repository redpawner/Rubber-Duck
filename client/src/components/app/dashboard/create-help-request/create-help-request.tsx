import React from "react";
import create from "zustand";

const useStore = create(set => ({
  // bears: 0,
  // increasePopulation: () => set(state => ({ bears: state.bears + 1 })),    <<< EXAMPLE
  // removeAllBears: () => set({ bears: 0 })
}));


export default useStore;