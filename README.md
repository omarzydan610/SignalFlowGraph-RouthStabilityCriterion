# Signal Flow Graph & Routh-Hurwitz Stability Criterion

This project was developed as part of the **Control Systems Basics** course at **Alexandria University**.

![Stability1](images/HomePage.png)

**The project is divided into two parts:**

## Part 1: Signal Flow Graph and Transfer Function Calculation

The first part focuses on visualizing the Signal Flow Graph (SFG) of a control system and computing its transfer function using **Mason’s Gain Formula**.

### What is a Signal Flow Graph?

A Signal Flow Graph (SFG) is a graphical representation of a set of linear algebraic equations that describe a system. It is a valuable tool in control systems for modeling and analyzing how signals flow through different components of a system.

### Key Features:

1. **Input Nodes and Edges:** The system allows users to input the nodes and edges of the control system.
2. **Graph Visualization:** Visualizes the graph to represent the control system.
3. **Path and Loop Detection:** Identifies paths and loops within the system.
4. **Transfer Function Calculation:** Uses Mason’s Gain Formula to compute the transfer function of the system.

### Screenshots:

| ![Graph1](images/SignalFlowGraph1.png) | ![Graph2](images/SignalFlowGraph2.png) |
| ------------------------------------ | ------------------------------------ |
| ![Graph3](images/SignalFlowGraph3.png) | ![Graph4](images/SignalFlowGraph4.png) |

---

## Part 2: Routh-Hurwitz Stability Criterion

The second part of the project focuses on determining the stability of a system using the **Routh-Hurwitz Stability Criterion**. This criterion helps in analyzing the stability of a linear time-invariant system by examining its characteristic equation.

### What is the Routh-Hurwitz Stability Criterion?

The Routh-Hurwitz Stability Criterion is used to determine the stability of a system by analyzing its characteristic equation, which is derived from the transfer function. A system is considered stable if all its poles lie in the left half of the complex plane.

### Key Features:

1. **Input Characteristic Equation:** Users provide the characteristic equation of the system.
2. **Routh-Hurwitz Table Construction:** Constructs the Routh-Hurwitz table from the equation.
3. **Stability Detection:** Determines if the system is stable or not.
4. **Root Detection:** If the system is unstable, the tool detects the number and values of roots in the right-hand side (RHS) of the complex plane.

### Screenshot:

![Stability1](images/RouthStability1.png)

| ![Stability2](images/RouthStability2.png) | ![Stability3](images/RouthStability3.png) |
| --------------------------------------- | --------------------------------------- |

---

### Tech Stack

- **Frontend:** React, Konva.js
- **Backend:** Flask

---

This project provides both a visual and analytical approach to understanding control systems and their stability, making it a valuable resource for students and engineers working with linear systems.

**For additional details about this project, please refer to the [Project Report](https://github.com/omarzydan610/SignalFlowGraph-RouthStabilityCriterion/blob/main/Project%20Report.pdf).**
