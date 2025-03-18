from itertools import combinations
from collections import defaultdict

class SignalFlowGraph:
    def __init__(self, graph):
        self.graph = graph
        self.node_count = len(graph)
        self.paths = None
        self.cycles = None
        self.cycle_gains = None
        self.path_gains = None
        self.path_deltas = None
        self.non_touching_cycles = None
        self.visited = {node: False for node in self.graph}
        self.start_node = None
        self.end_node = None
        self.total_delta = None
        self.transfer_func = None
        self.optimize_graph() # first step

    def optimize_graph(self):
    # This function is used to optimize the graph by removing self loops and parallel edges
        return

    def detect_cycles(self):

        return 

    def dfs_cycles(self, node, start, path):
        path.append(node)


    def is_duplicate_cycle(self, new_cycle):

        return 

    def are_elements_equal(self, arr1, arr2):
        return 

    def are_circular_identical(self, arr1, arr2):

        return 

    def get_non_touching_cycles(self):

        return 

    def get_n_non_touching_cycles(self, n):

        return 

    def are_non_touching(self, comb):

        return 

    def do_cycles_touch(self, cycle1, cycle2):
        return 

    def find_start_node(self):
        if self.start_node is not None:
            return self.start_node
        indegree = defaultdict(int)
        for node in self.graph:
            for edge in self.graph[node]:
                indegree[edge[0]] += 1
        for node in self.graph:
            if indegree[node] == 0:
                return node
        return '1'

    def find_end_node(self):
        if self.end_node is not None:
            return self.end_node
        for node in self.graph:
            if not self.graph[node]:
                return node
        return str(self.node_count)

    def get_paths(self):

        return 

    def dfs_paths(self, node, end, path):
        self.visited[node] = True
        
        

    def compute_gain(self, path):

        return 

    def compute_cycle_gains(self):

        return 

    def compute_path_gains(self):

        return 

    def compute_total_delta(self):

        return 

    def compute_path_deltas(self):

        return 

    def compute_delta_for_path(self, path):

        return 

    def compute_transfer_function(self):

        return    

if __name__ == '__main__':
    graph={
        'A':[('B',1)],
        'B':[('C',3.2),('H',1.5),('D',1.5)],
        'C':[('D',1.5),('B',4.3)],
        'D':[('C',-0.5),('E',5)],
        'E':[('D',1.25),('G',3),('F',2)],
        'F':[('E',-1),('G',4.5)],
        'G':[('G',3),('F',1.2),('H',1.3)],
        'H':[]
    }
    sfg = SignalFlowGraph(graph)
    
    # To print list of forward paths
    print("Forward Paths:", sfg.get_paths())

    # To print list of individual loops
    print("Individual Loops:", sfg.detect_cycles())

    # to print all combinations of N non-touching loops:
    all_non_touching_loops=sfg.get_non_touching_cycles()

    counter = 2
    for list_of_loops in all_non_touching_loops: # list of 2,3,4,.... non touching loops
        print(f"All {counter} Non-touching loops:")
        counter+=1
        inner_loop=0
        for loops in list_of_loops:     # i - non touching loops
            for loop in loops:
                print(sfg.cycles[loop])
            if inner_loop != len(list_of_loops) - 1:               
                print(",")
            inner_loop+=1
        print("------------") # Seperator Between Different Ns (N-non touching loops)


    # To print the overall delta value (Δ)
    print("Overall Delta:", sfg.compute_total_delta()) 

    # To print Δ1, .... ,Δm (m is number of forward paths)
    print("Paths Delta:", sfg.compute_path_deltas())

    # To print a list of individual loop GAINS
    print("Individual Loop Gains:", sfg.compute_cycle_gains()) # This is extra output

    # To print a list of forward path GAINS
    print("Forward Path Gains:", sfg.compute_path_gains()) # This is extra output

    # (you can print the input and output nodes using the below code)
    print(f"Input Node: {sfg.find_start_node()}, Output Node: {sfg.find_end_node()}")

    # To print the overall transfer function
    print("Overall Transfer Function:", sfg.compute_transfer_function()) # Final Result (Most important)
 