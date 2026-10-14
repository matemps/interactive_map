import { useRef, useEffect } from "react";


const TreeNode = ({ts, id, label, children, expanded, checked, callback}) => {
    const checkBoxRef = useRef(null);

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
        const setChecked = (node, value) => ({
            ...node,
            checked: value,
            children: node.children.map((child) => setChecked(child, value))
        });

        const updateNodes = (nodes) => nodes.map((node) => {
            if (node.id === id) {
                return setChecked(node, !node.checked);
            }

            if (node.children.length == 0) {
                return node;
            }

            const newChildren = updateNodes(node.children);

            return {
                ...node,
                checked: newChildren.every((child) => child.checked),
                children: newChildren
            };
        });

        // set new tree state
        callback(updateNodes(ts));
    };

    // checkbox has indeterminate state when some but not all descendants 
    // are checked 
    
    const hasCheckedDescendants = (node) =>
        node.checked || node.children.some(hasCheckedDescendants);
    const indeterminate = !checked && children.some(hasCheckedDescendants);
    

    // manipulate checkbox inside dom
    useEffect(() => {
        checkBoxRef.current.indeterminate = indeterminate
    }, [indeterminate]);

    
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
                        <input ref={checkBoxRef} type="checkbox" checked={checked} onChange={handleCheckboxToggle} />
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