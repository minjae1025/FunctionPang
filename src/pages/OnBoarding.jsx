import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '@/assets/함수팡.svg';
import ribbon from '@/assets/띠.svg';

const dots = [
  { id: 1, left: '16.7%', delay: '0s' },
  { id: 2, left: '50%', delay: '0.45s' },
  { id: 3, left: '84%', delay: '0.9s' },
];

const DOT_DROP_DURATION = 850;
const LAST_DOT_DELAY = 900;
const DETAIL_DELAY = 1000;

const OnBoarding = ({ onFinish }) => {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      onFinish?.();
    }, LAST_DOT_DELAY + DOT_DROP_DURATION + DETAIL_DELAY);

    return () => window.clearTimeout(timerId);
  }, [onFinish]);

  return (
    <Screen>
      <Ribbon src={ribbon} alt="" aria-hidden="true" />

      <BrandArea aria-label="함수팡 온보딩">
        <Dots aria-hidden="true">
          {dots.map((dot) => (
            <Dot key={dot.id} $left={dot.left} $delay={dot.delay} />
          ))}
        </Dots>
        <Logo src={logo} alt="함수팡" />
      </BrandArea>
    </Screen>
  );
};

const dropBounce = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -54px) scale(1, 1);
  }

  42% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1.16, 0.72);
  }

  62% {
    transform: translate(-50%, -18px) scale(0.94, 1.08);
  }

  80% {
    transform: translate(-50%, 0) scale(1.08, 0.86);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1, 1);
  }
`;

const Screen = styled.main`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #f7f7f7;
`;

const BrandArea = styled.section`
  position: absolute;
  top: 42%;
  left: 50%;
  z-index: 1;
  display: flex;
  width: min(26vw, 180px);
  min-width: 104px;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const Dots = styled.div`
  position: absolute;
  top: -24%;
  left: 0;
  width: 100%;
  height: 0;
`;

const Dot = styled.span`
  position: absolute;
  left: ${({ $left }) => $left};
  width: clamp(7px, 1.12vw, 10px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #050505;
  opacity: 0;
  transform-origin: center bottom;
  animation: ${dropBounce} ${DOT_DROP_DURATION}ms cubic-bezier(0.24, 0.66, 0.34, 1) forwards;
  animation-delay: ${({ $delay }) => $delay};
`;

const Ribbon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: clamp(310px, 47vw, 680px);
  max-width: 72vw;
  height: auto;
  user-select: none;
  pointer-events: none;
`;

export default OnBoarding;
