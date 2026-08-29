import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';

interface PortfolioContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isModalOpen: boolean;
  openModal: (projectId: string) => void;
  closeModal: () => void;
  activeProjectId: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<string>('hero');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Memoize state setter callbacks
  const setActiveSection = useCallback((section: string) => {
    setActiveSectionState(section);
  }, []);

  const openModal = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setActiveProjectId(null);
  }, []);

  // Memoize context value object
  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      isModalOpen,
      openModal,
      closeModal,
      activeProjectId,
    }),
    [activeSection, setActiveSection, isModalOpen, openModal, closeModal, activeProjectId]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  return context;
}
