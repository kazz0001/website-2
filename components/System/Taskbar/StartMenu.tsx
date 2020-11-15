import styles from '@/styles/System/Taskbar/StartMenu.module.scss';

import ButtonBar from '@/components/System/Taskbar/ButtonBar';
import FileManager from '@/components/System/FileManager/FileManager';
import MenuView from '@/components/System/FileManager/MenuView';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

const StartMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const buttonsRef = useRef<HTMLOListElement>(null);

  return (
    <nav>
      {showMenu && (
        <nav className={styles.menu}>
          <ButtonBar
            startButtonRef={startButtonRef}
            buttonsRef={buttonsRef}
            setShowMenu={setShowMenu}
          />
          <FileManager
            path="/start"
            render={MenuView}
            onChange={(cwd) => !cwd && setShowMenu(false)}
          />
        </nav>
      )}
      <button
        ref={startButtonRef}
        className={`${styles.start} ${showMenu && styles.menuOpen}`}
        type="button"
        title="Start"
        onClick={() => setShowMenu(!showMenu)}
        onBlur={({ relatedTarget }) => {
          if (!relatedTarget) {
            startButtonRef?.current?.focus();
          } else if (!buttonsRef.current?.contains(relatedTarget as Node)) {
            setShowMenu(false);
          }
        }}
      >
        <FontAwesomeIcon icon={faWindows} />
      </button>
    </nav>
  );
};

export default StartMenu;
