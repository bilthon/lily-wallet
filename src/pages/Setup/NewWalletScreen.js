import React, { useEffect } from "react";
import styled from "styled-components";
import { generateMnemonic } from "bip39";

import { Button, MnemonicWordsDisplayer } from "../../components";
import {
  lightBlue,
  darkOffWhite,
} from "../../utils/colors";
import { InnerWrapper, XPubHeaderWrapper, SetupHeaderWrapper, SetupExplainerText, FormContainer, BoxedWrapper, SetupHeader } from './styles';

const CreateWallet = ({
  header,
  walletMnemonic,
  setWalletMnemonic,
  setStep,
}) => {

  useEffect(() => {
    setWalletMnemonic(generateMnemonic(256));
  }, [setWalletMnemonic]);

  return (
    <InnerWrapper style={{ marginBottom: '2em' }}>
      {header}
      <FormContainer>
        <BoxedWrapper>
          <XPubHeaderWrapper>
            <SetupHeaderWrapper>
              <div>
                <SetupHeader>Write down these recovery words</SetupHeader>
                <SetupExplainerText>
                  These 24 words are the keys to your wallet. Write them down and keep
                  them in a safe place. Do not share them with anyone else. These can
                  be used to recover your wallet if you lose your configuration file.
                </SetupExplainerText>
              </div>
            </SetupHeaderWrapper>
          </XPubHeaderWrapper>
          <WordContainer>
            <MnemonicWordsDisplayer mnemonicWords={walletMnemonic} />
          </WordContainer>
          <SaveWalletButton
            onClick={() => {
              setStep(3);
            }}>
            I have written these words down <br /> and stored them in a safe place
          </SaveWalletButton>
        </BoxedWrapper>
      </FormContainer>
    </InnerWrapper>
  )
};

const SaveWalletButton = styled.div`
  ${Button};
  flex: 1;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const WordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1.25em;
  background: ${lightBlue};
  justify-content: center;
  border-bottom: 1px solid ${darkOffWhite};
`;

export default CreateWallet;
