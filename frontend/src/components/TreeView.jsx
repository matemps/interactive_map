const TreeNode = ({ts, id, label, children, expanded, checked, callback}) => {
    const handleExpandCollapseBtnClick = () => {
        const newTreeState = ts.map((node) => 
            node.id === id
                ? { ...node, expanded: !node.expanded }
                : node
        );

        // set new tree state
        callback(newTreeState);
    }

    const handleCheckboxToggle = () => {

    }
    
    const expandCollapseBtn = children.length
        ? (
            <div>
                <button onClick={handleExpandCollapseBtnClick}></button>
            </div>
        )
        : null;
    
    const childList = children.length > 0 && expanded
        ? (
            <div>
                <ul>
                    {children.map((child) => (
                        <TreeNode
                            key={child.id}
                            ts={ts}
                            id={child.id}
                            label={child.label}
                            children={child.children}
                            expanded={child.expanded}
                            checked={child.checked}
                            callback={callback}
                        />
                    ))}
                </ul>
            </div>
        )
        : null;
    
    return (
        <div className="node-container">
            <div className="node">
                <div>
                    {expandCollapseBtn}
                    <div>
                        <input type="checkbox" value={checked} onClick={handleCheckboxToggle} />
                    </div>
                    <p>{label}</p>
                </div>
            </div>
            {childList}
        </div>
    );
};

const TreeView = ({ts, callback}) => {
    return (
        <ul id="treeview">
            {ts.map((node) => (
                <TreeNode
                    key={node.id}
                    ts={ts}
                    id={node.id}
                    label={node.label}
                    children={node.children}
                    expanded={node.expanded}
                    checked={node.checked}
                    callback={callback}
                />
            ))}
        </ul>
    );
};

export default TreeView;