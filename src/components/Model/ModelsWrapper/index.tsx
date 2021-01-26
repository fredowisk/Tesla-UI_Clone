import React, { useCallback, useRef, useState } from "react";

import ModelsContext, { CarModel } from "../ModelsContext";
import ModelOverlay from "../ModelOverlay";

import { Container, OverlaysRoot } from "./styles";

const ModelsWrapper: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([]);

  // Função que registra um modelo, adicionando ele ao estado
  const registerModel = useCallback((model: CarModel) => {
    setRegisteredModels((state) => [...state, model]);
  }, []);

  // Função que remove um modelo do estado, fazendo um filtro que só irá retornar
  // todos os modelos que sejam diferentes daquele que será deletado
  const unregisterModel = useCallback((modelName: string) => {
    setRegisteredModels((state) =>
      state.filter((model) => model.modelName !== modelName)
    );
  }, []);

  // Função que busca o modelo pelo nome passado por parâmetro
  // Utilizando um find no estado para cada carro, que irá verificar se os nomes são iguais
  const getModelByName = useCallback(
    (modelName: string) => {
      return (
        registeredModels.find((car) => car.modelName === modelName) || null
      );
    },
    [registeredModels]
  );
  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName,
      }}
    >
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registeredModels.map((item) => (
            <ModelOverlay key={item.modelName} model={item}>
              {item.overlayNode}
            </ModelOverlay>
          ))}
        </OverlaysRoot>

        {children}
      </Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
