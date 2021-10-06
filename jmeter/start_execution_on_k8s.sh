#!/bin/bash
test_plan="obi-frontend-k8s-test-plan.jmx"
master_pod=`kubectl -n jmeter-obi get po | grep jmeter-master | awk '{print $1}'`
kubectl -n jmeter-obi cp "$test_plan" "$master_pod:/$test_plan"
kubectl -n jmeter-obi exec -ti $master_pod -- /bin/bash /load_test "$test_plan"
