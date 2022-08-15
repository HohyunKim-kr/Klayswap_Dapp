import React, { useContext, useState } from "react";
import { SwapContext } from "../context/SwapProvider";
import "./Nav.css";

const Nav = () => {
  const { myAddress, setMyAddress, setMyKlayAmount } = useContext(SwapContext);
  const connectWallet = async () => {
    if (!window.klaytn) alert("카이카스지갑 설치해!");
    const [address] = await window.klaytn.enable();
    setMyAddress(address);
    const klayAmount = await window.caver.klay.getBalance(address);
    setMyKlayAmount(klayAmount / 1e18);
  };
  return (
    <nav>
      <section className="home">
        <article>
          <img src="https://klayswap.com/img/logo/logo.svg" alt="main logo" />
        </article>
        <article>KLAYswap</article>
      </section>
      <section className="nav-items">
        <NavItem text="내자산" />
        <NavItem text="스왑" />
        <NavItem text="예치" isDropdown={true} />
        <NavItem text="KSP거버넌스" isDropdown={true} />
        <NavItem text="Drops" />
        <NavItem text="대시보드" />
      </section>
      <section className="nav-btn">
        {myAddress ? (
          <div>{myAddress.substring(0, 16)}...</div>
        ) : (
          <button onClick={connectWallet}>지갑연결</button>
        )}
      </section>
    </nav>
  );
};

const NavItem = (props) => {
  return (
    <article className="nav-item">
      <span>{props.text}</span>
      {props.isDropdown ? (
        <img
          src="https://klayswap.com/img/icon/ic-triangle-bottom-gray.svg"
          alt="ic-triangle-bottom-gray"
        />
      ) : (
        <></>
      )}
    </article>
  );
};

export default Nav;
