/**
 * @name Reflected cross-site scripting vulnerability
 * @kind path-problem
 * @problem.severity warning
 * @id js/reflected-xss
 */

 import javascript
 import semmle.javascript.security.dataflow.ReflectedXss::ReflectedXss
 import DataFlow::PathGraph
 
 from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
 where cfg.hasFlowPath(source, sink)
 select sink.getNode(), source, sink, "Cross-site scripting vulnerability due to $@.",
        source.getNode(), "user-provided value"