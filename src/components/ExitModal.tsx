import "./Modal.css";

interface ExitModalProps {
  onResume: () => void;
  onReturnToLanding: () => void;
}

function ExitModal({ onResume, onReturnToLanding }: ExitModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Paused</h2>
        <div className="modal__controls">
          <div className="control-group">
            <h3>Movement</h3>
            <ul>
              <li><kbd>W</kbd> - Move Forward</li>
              <li><kbd>A</kbd> - Move Left</li>
              <li><kbd>S</kbd> - Move Backward</li>
              <li><kbd>D</kbd> - Move Right</li>
              <li><kbd>Shift</kbd> - Sprint (optional)</li>
              <li><kbd>Ctrl</kbd> - Crouch (optional)</li>
            </ul>
          </div>
          <div className="control-group">
            <h3>Look</h3>
            <ul>
              <li><strong>Mouse</strong> - Look Around</li>
            </ul>
          </div>
          <div className="control-group">
            <h3>Menu</h3>
            <ul>
              <li><kbd>ESC</kbd> - Pause Menu</li>
            </ul>
          </div>
        </div>
        <div className="modal__actions">
          <button className="btn btn--primary" onClick={onResume}>
            Resume
          </button>
          <button className="btn btn--ghost" onClick={onReturnToLanding}>
            Return to Landing
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitModal;
