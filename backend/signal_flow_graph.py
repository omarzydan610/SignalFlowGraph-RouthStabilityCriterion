from itertools import combinations
from collections import defaultdict

class SignalFlowAnalyzer:
    def __init__(self, network):
        self.input_node = None
        self.output_node = None
        self.total_system_delta = None
        self.transfer_function = None
        self.network = network
        self.node_count = len(network)
        self.forward_paths = None
        self.loops = None
        self.loop_gains = None
        self.path_gains = None
        self.path_deltas = None
        self.non_touching_loop_groups = None
        self.visited = {node: False for node in self.network}

        
        self.optimize_network() 

    def optimize_network(self):
        for node in self.network:
            edge_aggregator = defaultdict(int)
            for edge in self.network[node]:
                destination, gain = edge
                edge_aggregator[destination] += gain
            self.network[node] = [(dest, gain) for dest, gain in edge_aggregator.items()]

    def find_loops(self):
        if self.loops is not None:
            return self.loops
        self.loops = []
        for node in self.network:
            if not self.visited[node]:
                self.dfs_find_loops(node, node, [])
        return self.loops

    def dfs_find_loops(self, current_node, start_node, path):
        path.append(current_node)
        for branch in self.network[current_node]:
            next_node = branch[0]
            if next_node == start_node:
                if not self.is_loop_duplicate(path + [start_node]):
                    self.loops.append(path + [start_node])
            elif next_node not in path:
                self.dfs_find_loops(next_node, start_node, path[:])

    def is_loop_duplicate(self, new_loop):
        for loop in self.loops:
            if self.are_loops_identical(loop[:-1], new_loop[:-1]) and self.are_elements_same(loop[:-1], new_loop[:-1]):
                return True
        return False

    def are_elements_same(self, list1, list2):
        return sorted(list1) == sorted(list2)

    def are_loops_identical(self, list1, list2):
        list1_doubled = list1 + list1
        list2_str = ' '.join(map(str, list2))
        return list2_str in ' '.join(map(str, list1_doubled))

    def find_non_touching_loop_groups(self):
        if self.non_touching_loop_groups is not None:
            return self.non_touching_loop_groups
        self.non_touching_loop_groups = []
        if self.loops is None:
            self.find_loops()
        for n in range(2, len(self.loops) + 1):
            combinations = self.get_n_non_touching_loops(n)
            if not combinations:
                break
            self.non_touching_loop_groups.append(combinations)
        return self.non_touching_loop_groups

    def get_n_non_touching_loops(self, n):
        non_touching_combinations = []
        for comb in combinations(self.loops, n):
            if self.are_loops_non_touching(comb):
                non_touching_combinations.append([self.loops.index(loop) for loop in comb])
        return non_touching_combinations

    def are_loops_non_touching(self, comb):
        for i in range(len(comb)):
            for j in range(i + 1, len(comb)):
                if self.do_loops_intersect(comb[i], comb[j]):
                    return False
        return True

    def do_loops_intersect(self, loop1, loop2):
        return any(node in loop2 for node in loop1)

    def determine_input_node(self):
        if self.input_node is not None:
            return self.input_node
        in_degree = defaultdict(int)
        for node in self.network:
            for edge in self.network[node]:
                in_degree[edge[0]] += 1
        for node in self.network:
            if in_degree[node] == 0:
                return node
        return '1'

    def determine_output_node(self):
        if self.output_node is not None:
            return self.output_node
        for node in self.network:
            if not self.network[node]:
                return node
        return str(self.node_count)

    def find_forward_paths(self):
        if self.forward_paths is not None:
            return self.forward_paths
        self.forward_paths = []
        self.input_node = self.determine_input_node()
        self.output_node = self.determine_output_node()
        self.dfs_find_paths(self.input_node, self.output_node, [])
        return self.forward_paths

    def dfs_find_paths(self, current_node, end_node, path):
        self.visited[current_node] = True
        path.append(current_node)
        if current_node == end_node:
            self.forward_paths.append(path[:])
        else:
            for branch in self.network[current_node]:
                next_node = branch[0]
                if not self.visited[next_node]:
                    self.dfs_find_paths(next_node, end_node, path)
        path.pop()
        self.visited[current_node] = False

    def calculate_gain(self, path):
        gain = 1
        for i in range(len(path) - 1):
            for edge in self.network[path[i]]:
                if edge[0] == path[i + 1]:
                    gain *= edge[1]
                    break
        return gain

    def calculate_loop_gains(self):
        if self.loop_gains is not None:
            return self.loop_gains
        if self.loops is None:
            self.find_loops()
        self.loop_gains = [self.calculate_gain(loop) for loop in self.loops]
        return self.loop_gains

    def calculate_path_gains(self):
        if self.path_gains is not None:
            return self.path_gains
        if self.forward_paths is None:
            self.find_forward_paths()
        self.path_gains = [self.calculate_gain(path) for path in self.forward_paths]
        return self.path_gains

    def calculate_total_system_delta(self):
        if self.total_system_delta is not None:
            return self.total_system_delta
        if self.loop_gains is None:
            self.calculate_loop_gains()

        delta = 1 - sum(self.loop_gains)

        sign = 1
        if self.non_touching_loop_groups is None:
            self.find_non_touching_loop_groups()

        for loop_group in self.non_touching_loop_groups:
            current = 0
            for loops in loop_group:
                non_touching_gain = 1
                for loop in loops:
                    non_touching_gain *= self.loop_gains[loop]
                current += non_touching_gain
            delta += sign * current
            sign *= -1

        self.total_system_delta = delta
        return delta

    def calculate_path_deltas(self):
        if self.path_deltas is not None:
            return self.path_deltas
        if self.forward_paths is None:
            self.find_forward_paths()
        self.path_deltas = [self.calculate_delta_for_path(path) for path in self.forward_paths]
        return self.path_deltas

    def calculate_delta_for_path(self, path):
        delta = 1
        temp_loops = [loop for loop in self.loops if not any(node in path for node in loop)]
        if temp_loops:
            delta -= sum(self.calculate_gain(loop) for loop in temp_loops)

        sign = 1
        temp_loops = []
        temp_loop_group = []
        non_touching_gain = 1

        if self.non_touching_loop_groups is None:
            self.find_non_touching_loop_groups()

        for loop_group in self.non_touching_loop_groups:
            for loops in loop_group:
                for loop in loops:
                    temp_loop_group.append(self.loops[loop])
                if all(all(node not in path for node in subloop) for subloop in temp_loop_group):
                    temp_loops.extend(temp_loop_group)
                if temp_loops:
                    for loop in temp_loops:
                        non_touching_gain *= self.calculate_gain(loop)
                    delta += sign * non_touching_gain
                non_touching_gain = 1
                temp_loops = []
                temp_loop_group = []
            sign *= -1

        return delta

    def calculate_transfer_function(self):
        if self.transfer_function is not None:
            return self.transfer_function
        if self.path_gains is None:
            self.calculate_path_gains()
        if self.path_deltas is None:
            self.calculate_path_deltas()
        numerator = sum(gain * delta for gain, delta in zip(self.path_gains, self.path_deltas))
        denominator = self.calculate_total_system_delta()
        self.transfer_function = numerator / denominator
        return self.transfer_function           

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
    analyzer = SignalFlowAnalyzer(graph)
    
    # To print list of forward paths
    print("Forward Paths:", analyzer.find_forward_paths())

    # To print list of individual loops
    print("Individual Loops:", analyzer.find_loops())

    # to print all combinations of N non-touching loops:
    all_non_touching_loops=analyzer.find_non_touching_loop_groups()

    counter = 2
    for loop_group in all_non_touching_loops: # list of 2,3,4,.... non touching loops
        print(f"All {counter} Non-touching loops:")
        counter+=1
        inner_loop=0
        for loops in loop_group:     # i - non touching loops
            for loop in loops:
                print(analyzer.loops[loop])
            if inner_loop != len(loop_group) - 1:               
                print(",")
            inner_loop+=1
        print("------------") # Seperator Between Different Ns (N-non touching loops)


    # To print the overall delta value (Δ)
    print("Overall Delta:", analyzer.calculate_total_system_delta()) 

    # To print Δ1, .... ,Δm (m is number of forward paths)
    print("Paths Delta:", analyzer.calculate_path_deltas())

    # To print a list of individual loop GAINS
    print("Individual Loop Gains:", analyzer.calculate_loop_gains()) # This is extra output

    # To print a list of forward path GAINS
    print("Forward Path Gains:", analyzer.calculate_path_gains()) # This is extra output

    # (you can print the input and output nodes using the below code)
    print(f"Input Node: {analyzer.determine_input_node()}, Output Node: {analyzer.determine_output_node()}")

    # To print the overall transfer function
    print("Overall Transfer Function:", analyzer.calculate_transfer_function()) # Final Result (Most important)
 