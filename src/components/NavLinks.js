import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from "react-router-dom";
import { VerticalAlignBottom, AddCircleOutline, Settings } from '@styled-icons/material';
import { Home } from '@styled-icons/fa-solid'
import { SendPlane } from '@styled-icons/remix-fill';
import { networks } from 'bitcoinjs-lib';

import { StyledIcon } from '.';

import { blue, white, offWhite, darkGray, darkOffWhite, lightBlue, lightBlack } from '../utils/colors';
import { bitcoinNetworkEqual } from '../utils/transactions';


export const NavLinks = ({ config, setCurrentAccount, currentBitcoinNetwork }) => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <WalletTitle>
        {bitcoinNetworkEqual(currentBitcoinNetwork, networks.testnet) ?
          <LilyImageGray src={require('../assets/flower.svg')} /> :
          <LilyImage src={require('../assets/flower.svg')} />
        }
        <WalletTitleText>
          Lily Wallet
        {bitcoinNetworkEqual(currentBitcoinNetwork, networks.testnet) &&
            ' (testnet)'
          }
        </WalletTitleText>

      </WalletTitle>
      <SidebarItem active={pathname === '/'} to="/" loading={false}>
        <StyledIcon as={Home} size={24} style={{ marginRight: '.65rem' }} />
          Home
        </SidebarItem>
      <SidebarItemLink active={pathname === '/send'} to="/send">
        <StyledIcon as={SendPlane} size={24} style={{ marginRight: '.65rem' }} />
          Send
        </SidebarItemLink>
      <SidebarItemLink active={pathname === '/receive'} to="/receive">
        <StyledIcon as={VerticalAlignBottom} size={24} style={{ marginRight: '.65rem' }} />
            Receive
        </SidebarItemLink>
      <SidebarItemLink active={pathname === '/settings'} to="/settings">
        <StyledIcon as={Settings} size={24} style={{ marginRight: '.65rem' }} />
            Settings
        </SidebarItemLink>

      <WalletsHeader>Accounts</WalletsHeader>
      <AccountsContainer>
        {
          config.wallets.map((wallet) => (
            <SidebarItemLink
              key={wallet.id}
              active={pathname === `/vault/${wallet.id}`}
              onClick={() => {
                setCurrentAccount(wallet.id);
              }}
              to={`/vault/${wallet.id}`}
            >
              {wallet.mnemonic ? (
                <IconSvg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"></path></IconSvg>
              ) : (
                  <IconSvg viewBox="0 0 20 20" fill="currentColor" class="calculator w-6 h-6"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd"></path></IconSvg>
                )}
              {wallet.name}</SidebarItemLink>
          ))
        }

        {
          config.vaults.map((vault) => (
            <SidebarItemLink
              key={vault.id}
              active={pathname === `/vault/${vault.id}`}
              onClick={() => {
                setCurrentAccount(vault.id);
              }}
              to={`/vault/${vault.id}`}
            >
              <IconSvg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd"></path></IconSvg>
              {vault.name}</SidebarItemLink>
          ))
        }
      </AccountsContainer>

      <SidebarItemLink
        active={pathname === '/setup'}
        to={`/setup`}
        loading={false}>
        <StyledIcon as={AddCircleOutline} size={24} style={{ marginRight: '.65rem' }} />
          New Account
          </SidebarItemLink>
    </Fragment >
  )
}

const WalletTitleText = styled.span`
  margin-left: 0.15em;
  margin-top: 0.25em;
`;

const LilyImage = styled.img`
  width: 36px;
  height: 36px;
  margin-right: .25em;
`;

const LilyImageGray = styled.img`
  width: 36px;
  height: 36px;
  margin-right: .25em;
  filter: grayscale(100%);
`;


const WalletsHeader = styled.h3`
  color: ${lightBlack};
  margin: 1.125em;
  font-size: 1.125em;
  font-weight: 100;
`;

const WalletTitle = styled(WalletsHeader)`
  display: flex;
  align-items: center;
  padding: 1.5em 0.5em 1.5em;
  font-weight: 700;
  margin: 0;
`;

const IconSvg = styled.svg`
  color: #869198;
  width: 1.25rem;
  margin-right: .65rem;
  height: 1.25rem;
  flex-shrink: 0;
`;

const AccountsContainer = styled.div`
  overflow: scroll;
  height: auto;
`;

const SidebarItemStyle = css`
  background: ${ p => p.active ? lightBlue : white};
  border: ${ p => p.active ? `solid 0.0625em ${darkOffWhite}` : 'none'};
  border-left: ${ p => p.active ? `solid 0.6875em ${blue}` : 'none'};
  margin-left: ${ p => p.active ? `solid 0.6875em ${blue}` : 'none'};
  border-right: none;
  color: ${ p => p.active ? 'inherit' : darkGray};
  padding: ${ p => p.active ? `1em 1.2em 1.125em .5em` : '1em 1.2em'};
  text-decoration: none;
  font-size: 0.9em;
  display: flex;
  align-items: center;

  &:hover {
    background: ${offWhite};
  }
`;

const SidebarItem = styled(({ active, ...p }) => <Link {...p} />)`
  ${SidebarItemStyle};
`;


const SidebarItemLink = styled(({ active, loading, ...p }) => <Link {...p} />)`
  ${SidebarItemStyle};
  text-decoration: none;
  pointer-events: ${p => p.loading ? 'none' : 'auto'};
`;