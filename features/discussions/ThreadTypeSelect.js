export const ThreadTypeSelect = ({ isSelected, ...props }) => (
    <div
        className={
            isSelected ? `ThreadTypeSelect is-selected` : `ThreadTypeSelect`
        }
        onClick={props.onClick}
    >
        {props.children}
    </div>
);
